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
      showCustomerForm: this.showCustomerForm.bind(this),
      showHistory: this.showHistory.bind(this),
      buy: this.buyProducts.bind(this),
    }
    this.model = new CartModel();
    this.view = new CartView(this.listeners);
    this.publisher.subscribe(
      'CHOOSE_TO_ADD',
      this.prepareNewInfo.bind(this, this.addNewProd.bind(this))
    );
  }

  buyProducts(customerData) {
    const customerProducts = this.model.getAllProducts();
    const order = JSON.stringify({ customerData, customerProducts });
    //this.publisher.notify('SEND_OWNER', order);
    this.publisher.notify('PRODUCTS_SOLD', customerProducts.map(({ id, count }) => ({ id, count })));
    this.model.addOrderToHistory(order);
    this.model.setAllProducts([]);
    this.showCart();
  }
  
  showCustomerForm() {
    this.view.renderCustomerForm();
  }

  showHistory() {
    const history = this.model.getOrdersHistory();
    console.log(history)
    this.view.renderHistory(history);
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

  changeProdPrice(count, amount) {
    const validError = this.model.validateCount(count, amount);
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