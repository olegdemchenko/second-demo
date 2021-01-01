export default class ProductModel {
  constructor() {
    this.products = [];
    this.currentParams = {};
  }

  getAllProducts() {
    return this.products;
  }

  getProducts({ property, value }) {
    if (property === 'category' && value === 'top') {
      return this.getAllProducts().slice(0, 15);
    }
    if (property === 'category' && value === 'discount') {
      return this.getAllProducts().slice(-30, -10);
    }
    return this.getAllProducts().filter(({ [property]: propValue }) => propValue.includes(value));
  }

  setProducts(products) {
    this.products = products;
  }

  setProductParams(params) {
    this.currentParams = params;
  }

  getProductParams() {
    return this.currentParams;
  }

  getProduct(prodId) {
    return this.products.find(({ id }) => id === prodId);
  }

  sortProducts(param, products) {
    return products.sort((a, b) => a[param] - b[param]);
  }

  calculatePrice(price, count) {
    return price * count;
  }

}