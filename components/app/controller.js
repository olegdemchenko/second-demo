import StoreModel from './model.js';
import StoreView from './view.js';

export default class StoreController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      showMainPage: () => this.publisher.notify('SHOW_CATEGORIES'),
    }
    this.model = new StoreModel();
    this.view = new StoreView(this.listeners);
    this.publisher.subscribe('SEND_OWNER', this.sendToOwner.bind(this));
    this.initApp();
  }

  async initApp() {
    const [categories, goods] = await Promise.all([this.model.loadCategories(), this.model.loadGoods()]);
    this.publisher.notify('LOAD_CATEGORIES', categories);
    this.publisher.notify('LOAD_GOODS', goods);
    this.publisher.notify('SHOW_CATEGORIES');
    this.publisher.notify('HIDE_PRELOADER');
  }
  
  sendToOwner(message) {
    this.model.sendMessageToOwner(message);
  }
}