import CustomerInfoView from './view.js';
import CustomerInfoModel from './model.js';

export default class CustomerInfoController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      validate: this.validate.bind(this),
      buy: this.buy.bind(this),
    }
    this.model = new CustomerInfoModel();
    this.view = new CustomerInfoView(this.listeners);
    this.publisher.subscribe('SHOW_CUSTOMER_FORM', this.showCustomerForm.bind(this));
    this.publisher.subscribe('PURCHASE_SUCCESS', this.showSuccessStatus.bind(this));
    this.publisher.subscribe('PURCHASE_FAIL', this.showFailStatus.bind(this));
  }

  validate(e) {
    const type = e.target.name;
    const value = e.target.value;
    this.model.setUserData(type, value);
    const validationResults = this.model.validateUserData();
    //console.log(validationResults);
    this.view.renderValidationRes(validationResults);
  }

  showCustomerForm() {
    this.view.renderCustomerForm();
  }

  showSuccessStatus() {
    this.view.renderPurchaseSuccess();
  }

  showFailStatus(message) {
    this.view.renderPurchaseError(message);
  }

  buy(e) {
    e.preventDefault();
    const userData = this.model.getUserData();
    this.publisher.notify('CUSTOMER_DATA', userData);
  }

}