export default class ProductModel {
  constructor() {
    this.products = [];
    this.actions = [];
  }

  getActions() {
    return this.actions;
  }

  setActions(newActions) {
    this.actions = newActions;
  }

  cleanActions() {
    this.actions = [];
  }

  addActions(actions) {
    const currentActions = this.getActions();
    const newActions = [...currentActions, actions];
    this.setActions(newActions);
  }

  getAllProducts() {
    return this.products;
  }

  getCurrentProducts() {
    const products = this.getAllProducts();
    const actions = this.getActions();
    return actions.reduce((acc, [action, params]) => {
      return action(...params, acc);
    }, products);
  }

  filterProducts({ property, value }, products) {
    return products.filter(({ [property]: propValue }) => propValue.includes(value));
  }

  setProducts(products) {
    console.log(products);
    this.products = products;
  }

  getProduct(prodId) {
    return this.products.find(({ id }) => id === prodId);
  }

  sortProducts(param, products) {
    return products.sort((a, b) => a[param] - b[param]);
  }

}