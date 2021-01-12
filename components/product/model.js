export default class ProductModel {
  constructor() {
    this.products = [];
    this.actions = [];
    this.actionsId = 0;
    this.predicates = {
      'MATCH': (prod, { property, value }) => prod[property].includes(value),
      'AVAILABLE': (prod) => prod.amount > 0,
    }
  }

  getPredicates() {
    return this.predicates;
  }

  getActions() {
    return this.actions;
  }

  setActions(newActions) {
    this.actions = newActions;
  }
  
  getActionsId() {
    return this.actionsId;
  }

  setActionsId(id) {
    this.actionsId = id;
  }

  changeProductsAmount(changedProducts) {
    const products = this.getAllProducts();
    const newProducts = products.map((prod) => {
      const changedProd = changedProducts.find(({ id }) => id === prod.id);
      if (changedProd) {
        return { ...prod, amount: prod.amount - changedProd.count };
      }
      return prod;
    });
    this.setProducts(newProducts);
  }

  addAction(action, params) {
    const currentActions = this.getActions();
    const id = this.getActionsId();
    const newAction = {
      id,
      action,
      params,
    }
    const newActions = [...currentActions, newAction];
    this.setActions(newActions);
    this.setActionsId(id + 1);
  }

  deleteAction(actionId) {
    const actions = this.getActions();
    const newActions = actions.filter(({ id }) => id !== actionId);
    this.setActions(newActions);
  }

  getAllProducts() {
    return this.products;
  }

  getCurrentProducts() {
    const products = this.getAllProducts();
    const actions = this.getActions();
    return actions.reduce((acc, { action, params }) => {
      return action(params, acc);
    }, products);
  }

  filterProducts({ predicate, params }, products) {
    const predicates = this.getPredicates();
    return products.filter((prod) => predicates[predicate](prod, params));
  }

  setProducts(products) {
    console.log(products);
    this.products = products;
  }

  getProduct(prodId) {
    return this.products.find(({ id }) => id === prodId);
  }

  sortProducts({ params: { property } }, products) {
    return [...products].sort((a, b) => a[property] - b[property]);
  }

}