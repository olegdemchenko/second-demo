export default class CartModel {
  constructor() {
    this.products = [];
    this.productOnChange = null;
  }
  /*
  getProductOnChange() {
    return this.productOnChange;
  }

  setProductOnChange(prod) {
    this.productOnChange = prod;
  }*/
  
  hasProduct(id) {
    return this.getAllProducts().some(({ id: prodId }) => prodId === id);
  }

  deleteProduct(prodId) {
    const products = this.getAllProducts();
    this.setAllProducts(products.filter(({ id }) => id !== prodId));
  }

  changeExistedProduct(newProd) {
    const allProducts = this.getAllProducts();
    const existedProdIndex = allProducts.findIndex(({ id }) => id === newProd.id);
    allProducts.splice(existedProdIndex, 1, newProd);
    this.setAllProducts(allProducts);
  }

  getAllProducts() {
    return this.products;
  }

  setAllProducts(newProducts) {
    this.products = newProducts;
  }

  getProduct(prodId) {
    return this.getAllProducts().find(({ id }) => id === prodId);
  }

  validateCount(count, amount) {
    const isValid = Number.isFinite(count) && count > 0 && Math.round(count) === count && count <= amount;
    return isValid ? null : 'Please, use only natural numbers, which less than amount of product';
  }
 
  getCartPrice() {
    const cartProducts = this.getAllProducts();
    return cartProducts.reduce((summ, { total_price }) => summ + total_price, 0);
  }
  /*
  calculatePrice(price, count) {
    return price * count;
  }*/

  addProduct(product) {
    this.products.push(product);
  }
  
  setUpParams(prod, params) {
    return { ...prod, ...params };
  }
}