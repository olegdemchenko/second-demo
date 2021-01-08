import StoreModel from './model.js';
import StoreView from './view.js';

export default class StoreController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      showMainPage: () => this.publisher.notify('SHOW_CATEGORIES'),
     // buy: () => this.publisher.notify('RETRIEVE_CART_PRODUCTS'),
      //setCustomerData: (data) => this.model.setCustomerData(data),
    }
    this.model = new StoreModel();
    this.view = new StoreView(this.listeners);
    //this.publisher.subscribe('CART_PRODUCTS', this.buyProducts.bind(this));
    this.publisher.subscribe('SEND_OWNER', this.sendToOwner.bind(this));
    this.initApp();
  }

  async initApp() {
    this.view.showSpinner();
    const [categories, goods] = await Promise.all([this.model.loadCategories(), this.model.loadGoods()]);
    this.publisher.notify('LOAD_CATEGORIES', categories);
    this.publisher.notify('LOAD_GOODS', goods);
    this.publisher.notify('SHOW_CATEGORIES');
    //this.publisher.subscribe('SHOW_CUSTOMER_FORM', this.view.renderCustomerForm.bind(this.view));
    this.view.hideSpinner();
  }
  /*
  buyProducts(products) {
    const userData = this.model.getCustomerData();
    this.model.sendMessageToOwner(JSON.stringify({ userData, products }));
  }
  */

  sendToOwner(message) {
    this.model.sendMessageToOwner(message);
  }
}