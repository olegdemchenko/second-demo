export default class TemporaryProductModel {
  constructor() {
    this.tempProduct = {};
    this.afterActions = [];
  }

  getAfterActions() {
    return this.afterActions;
  }

  setAfterActions(actions) {
    this.afterActions = actions;
  }

  getTempProduct() {
    return this.tempProduct;
  }

  setTempProduct(prod) {
    this.tempProduct = prod;
  }

  validateCount(count, amount) {
    const isValid = Number.isFinite(count) && count > 0 && Math.round(count) === count && count <= amount;
    return isValid ? null : 'Please, use only natural numbers, which less than amount of product';
  }

  calculatePrice(price, count) {
    return price * count;
  }

  setUpParams(prod, params) {
    return { ...prod, ...params };
  }
}