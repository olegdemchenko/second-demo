export default class CartModel {
  constructor() {
    this.products = [];
    this.productOnChange = null;
  }

  getProductOnChange() {
    return this.productOnChange;
  }

  setProductOnChange(prod) {
    this.productOnChange = prod;
  }

  hasProduct(id) {
    return this.getAllProducts().some(({ id: prodId }) => prodId === id);
  }

  deleteProduct(prodId) {
    const products = this.getAllProducts();
    this.setAllProducts(products.filter(({ id }) => id !== prodId));
  }

  changeExistedProduct(newProd) {
    const newProducts = this.getAllProducts().map((oldProd) => {
      if (oldProd.id === newProd.id) {
        return { ...oldProd, ...newProd };
      }
      return oldProd;
    });
    this.setAllProducts(newProducts);
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

  validateCount(count) {
    const parsedCount = Number.parseInt(count);
    return Number.isFinite(parsedCount) && parsedCount > 0 ? null : 'Please, use only natural numbers';
  }

  getCartPrice() {
    const cartProducts = this.getAllProducts();
    return cartProducts.reduce((summ, { total_price }) => summ + total_price, 0);
  }

  calculatePrice(price, count) {
    return price * count;
  }

  addProduct(product) {
    this.products.push(product);
  }


  setUpParams(prod, params) {
    return { ...prod, ...params };
  }
}