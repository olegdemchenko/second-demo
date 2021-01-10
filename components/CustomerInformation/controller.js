//import CustomerInfoModel from './model.js';
import CustomerInfoView from './view.js';

export default class CustomerInfoController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      buy: this.buy.bind(this),
    }
    this.view = new CustomerInfoView(this.listeners);
    this.publisher.subscribe('SHOW_CUSTOMER_FORM', this.showCustomerForm.bind(this));
    this.publisher.subscribe('PURCHASE_SUCCESS', this.showSuccessStatus.bind(this));
    this.publisher.subscribe('PURCHASE_FAIL', this.showFailStatus.bind(this));
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
    const name = e.target.elements['user-name'].value;
    const phone = e.target.elements['user-phone'].value;
    const email = e.target.elements['user-email'].value;
    this.publisher.notify('CUSTOMER_DATA', { name, phone, email });
  }

}