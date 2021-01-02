export default class CartModel {
  constructor() {
    this.products = [];
  }

  hasProduct(id) {
    return this.getAllProducts().some(({ id: prodId }) => prodId === id);
  }

  changeProdParams(prodId, newParams) {
    const newProducts = this.getAllProducts.map((oldProd) => {
      if (oldProd.id === prodId) {
        return { ...oldProd, ...newParams };
      }
      return oldProd;
    });
    this.setAllProducts = newProducts;
  }

  getAllProducts() {
    return this.products;
  }

  getProduct(id) {
    return this.get
  }

  validateCount(count) {
    const parsedCount = Number.parseInt(count);
    return Number.isFinite(parsedCount) && parsedCount > 0 ? null : 'Please, use only natural numbers';
  }

  calculatePrice(price, count) {
    return price * count;
  }

  addProduct(product) {
    this.products.push(product);
  }

}