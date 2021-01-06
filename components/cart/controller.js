import CartModel from './model.js';
import CartView from './view.js'

export default class CartController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      delete: this.deleteFromCart.bind(this),
      changeProdPrice: this.changeProdPrice.bind(this),
      selectProduct: this.prepareAddedInfo.bind(this, this.createMethodSequence([this.changeExistProd, this.showCart])),
      showCart: this.showCart.bind(this),
      showCustomerForm: this.showCustomerForm.bind(this)
    }
    this.model = new CartModel();
    this.view = new CartView(this.listeners);
    this.publisher.subscribe(
      'CHOOSE_TO_ADD',
      this.prepareNewInfo.bind(this, this.addNewProd.bind(this))
    );
    this.publisher.subscribe('RETRIEVE_CART_PRODUCTS', this.retrieveProducts.bind(this));
  }

  retrieveProducts() {
    const products = this.model.getAllProducts();
    this.publisher.notify('CART_PRODUCTS', products);
    this.model.setAllProducts([]);
  }

  showCustomerForm() {
    this.publisher.notify('SHOW_CUSTOMER_FORM');
  }  

  addNewProd() {
    const newProd = this.model.getProductOnChange();
    this.model.addProduct(newProd);
  }

  changeExistProd() {
    const changedProd = this.model.getProductOnChange();
    this.model.changeExistedProduct(changedProd);
  }

  deleteFromCart(id) {
    this.model.deleteProduct(id);
    this.showCart();
  }

  createMethodSequence(methods) {
    const invoker = function(args) {
      methods.forEach((method) => {
        method.call(this, args);
      }); 
    }
    return invoker.bind(this);
  }

  prepareNewInfo(callback, newProduct) {
    const normalProd = this.model.setUpParams(newProduct, { total_price: newProduct.price, count: 1 });
    this.model.setProductOnChange(normalProd);
    this.view.renderOrderForm(normalProd, callback);
  }

  prepareAddedInfo(callback, id) {
    const addedProd = this.model.getProduct(id);
    this.model.setProductOnChange(addedProd);
    this.view.renderOrderForm(addedProd, callback);
  }

  changeProdPrice(count) {
    const validError = this.model.validateCount(count);
    if (validError) {
      this.view.renderCountError(validError);
      return;
    }
    const currentProd = this.model.getProductOnChange();
    const total_price = this.model.calculatePrice(currentProd.price, count);
    const changedProd = this.model.setUpParams(this.model.getProductOnChange(), { count, total_price });
    this.model.setProductOnChange(changedProd);
    this.view.renderOrderPrice(total_price);
  }

  showCart() {
    const cartProducts = this.model.getAllProducts();
    const totalPrice = this.model.getCartPrice();
    this.view.renderCart(cartProducts, totalPrice);
  }
}