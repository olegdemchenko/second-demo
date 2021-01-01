import StoreModel from './model.js';
import StoreView from './view.js';

export default class StoreController {
  constructor(publisher) {
    this.publisher = publisher;
    this.model = new StoreModel();
    this.view = new StoreView();
    this.initApp();
  }

  async initApp() {
    this.view.showSpinner();
    const [categories, goods] = await Promise.all([this.model.loadCategories(), this.model.loadGoods()]);
    this.publisher.notify('LOAD_CATEGORIES', categories);
    this.publisher.notify('LOAD_GOODS', goods);
    this.publisher.notify('SHOW_CATEGORIES', categories);
    this.view.hideSpinner();
  }

}