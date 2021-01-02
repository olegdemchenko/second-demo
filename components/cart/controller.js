import CartModel from './model.js';
import CartView from './view.js'

export default class CartController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      changeProdCount: this.changeProdCount.bind(this),
      showCart: this.showCart.bind(this),
      add: this.addToCard.bind(this),
    }
    this.model = new CartModel();
    this.view = new CartView(this.listeners);
    this.publisher.subscribe('CHOOSE_TO_ADD', this.prepareCountForm.bind(this));
  }

  addToCard(prodData) {
    const isPreviouslyAdded = this.model.hasProduct(prodData.id);
    if (isPreviouslyAdded) {
      this.model.changeProdParams(prodData.id, prodData);
      return;
    }
    this.model.addProduct(prodData);
  }

  prepareCountForm(productData) {
    const isPreviouslyAdded = this.model.hasProduct(productData.id);
    if (isPreviouslyAdded) {
      const prevProduct = this.model.getProduct(product.id);
      this.view.renderOrderForm(prevProduct);
      return;
    }
    this.view.renderOrderForm(productData);
  }

  changeProdCount(count, price) {
    const validError = this.model.validateCount(count);
    if (validError) {
      this.view.renderCountError(validError);
      return;
    }
    const newPrice = this.model.calculatePrice(price, count);
    this.view.renderOrderPrice(newPrice);
  }

  showCart() {
    const cartProducts = this.model.getAllProducts();
    console.log();
  }
}