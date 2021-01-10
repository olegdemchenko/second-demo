import TemporaryProductModel from './model.js';
import TemporaryProductView from './view.js';

export default class TemporaryProductController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      send: this.sendTempProduct.bind(this),
      changeCount: this.changeProdPrice.bind(this),
    };
    this.model = new TemporaryProductModel();
    this.view = new TemporaryProductView(this.listeners);
    this.publisher.subscribe('SET_TEMPORARY_PRODUCT', this.setTempProduct.bind(this));
    this.publisher.subscribe('SET_TEMPORARY_AFTERACTIONS', this.setAfterActions.bind(this));
    this.publisher.subscribe('SHOW_TEMPORARY_PRODUCT', this.showTempProduct.bind(this));
  }

  setTempProduct(product) {
    this.model.setTempProduct(product);
  }

  showTempProduct() {
    const product = this.model.getTempProduct();
    this.view.renderTempProduct(product);
  }

  setAfterActions(actions) {
    this.model.setAfterActions(actions);
  }

  changeProdPrice(product, count) {
    const validError = this.model.validateCount(count, product.amount);
    if (validError) {
      this.view.renderCountError(validError);
      return;
    }
    const total_price = this.model.calculatePrice(product.price, count);
    const changedProd = this.model.setUpParams(product, { count, total_price });
    this.model.setTempProduct(changedProd);
    this.view.renderPrice(changedProd.total_price);
  }

  sendTempProduct(prod) {
    const actions = this.model.getAfterActions();
    this.publisher.notify('SEND_TEMPORARY_PRODUCT', prod);
    actions.forEach((ev) => this.publisher.notify(ev, prod));
  }

}