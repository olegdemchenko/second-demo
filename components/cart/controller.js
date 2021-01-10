import CartModel from './model.js';
import CartView from './view.js'

export default class CartController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      delete: this.deleteFromCart.bind(this),
      selectProduct: this.prepareAddedProduct.bind(this, ['SHOW_CART']),
      showCart: this.showCart.bind(this),
      showCustomerForm: this.showCustomerForm.bind(this),
      showHistory: this.showHistory.bind(this),
      buy: this.buyProducts.bind(this),
    }
    this.model = new CartModel();
    this.view = new CartView(this.listeners);
    this.publisher.subscribe(
      'CHOOSE_TO_ADD',
      this.prepareProduct.bind(this),
    );
    this.publisher.subscribe('SHOW_CART', this.showCart.bind(this));
    this.publisher.subscribe('SEND_TEMPORARY_PRODUCT', this.addProduct.bind(this));
    this.publisher.subscribe('CUSTOMER_DATA', this.buyProducts.bind(this));
  }

  buyProducts(customerData) {
    const customerProducts = this.model.getAllProducts();
    const order = JSON.stringify({ customerData, customerProducts });
    try {
     //this.publisher.notify('SEND_OWNER', order);
      this.publisher.notify('PRODUCTS_SOLD', customerProducts.map(({ id, count }) => ({ id, count })));
      this.publisher.notify('ADD_ORDER_TO_HISTORY', order);
      this.model.setAllProducts([]);
      this.showCart();
      this.publisher.notify('PURCHASE_SUCCESS');
    } catch(e) {
      this.publisher.notify('PURCHASE_FAIL', e.message);
    }
  }
  
  showCustomerForm() {
    this.publisher.notify('SHOW_CUSTOMER_FORM');
  }

  showHistory() {
    this.publisher.notify('SHOW_HISTORY');
  }
  
  addProduct(prod) {
    const isExist = this.model.hasProduct(prod.id);
    if (isExist) {
      this.model.changeExistedProduct(prod);
      return;
    }
    this.model.addProduct(prod);
  }
  
  deleteFromCart(id) {
    this.model.deleteProduct(id);
    this.showCart();
  }
 
  prepareProduct(productInfo) {
    const alreadyAdded = this.model.hasProduct(productInfo.id);
    if (alreadyAdded) {
      this.prepareAddedProduct([], productInfo.id);
      return;
    }
    this.prepareNewProduct(productInfo);
  } 
  
  prepareNewProduct(newProduct) {
    const normalProd = this.model.setUpParams(newProduct, { total_price: newProduct.price, count: 1 });
    this.publisher.notify('SET_TEMPORARY_PRODUCT', normalProd);
    this.publisher.notify('SHOW_TEMPORARY_PRODUCT');
   
  }

  prepareAddedProduct(events, id) {
    const addedProd = this.model.getProduct(id);
    this.publisher.notify('SET_TEMPORARY_PRODUCT', addedProd);
    this.publisher.notify('SHOW_TEMPORARY_PRODUCT');
    this.publisher.notify('SET_TEMPORARY_AFTERACTIONS', events);
  }

  showCart() {
    this.publisher.notify('CLEAN_ACTIONS');
    const cartProducts = this.model.getAllProducts();
    const totalPrice = this.model.getCartPrice();
    this.view.renderCart(cartProducts, totalPrice);
  }
}