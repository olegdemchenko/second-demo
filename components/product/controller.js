import ProductView from './view.js';
import ProductModel from './model.js';
import PaginationController from '../pagination/controller.js';

export default class ProductController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      showInfo: this.showProductInfo.bind(this),
      showProducts: this.showProducts.bind(this),
      sort: this.sortProducts.bind(this),
      search: this.filterProducts.bind(this),
      choose: this.chooseProduct.bind(this),
      deleteAction: this.deleteAction.bind(this),
    };
    this.view = new ProductView(this.listeners);
    this.model = new ProductModel();
    this.pagination = new PaginationController(this.view.renderProducts.bind(this.view), '.products-container');
    this.publisher.subscribe('LOAD_GOODS', this.setProducts.bind(this));
    this.publisher.subscribe('SHOW_CATEGORIES', this.cleanActions.bind(this));
    this.publisher.subscribe('CHOOSE_CATEGORY', this.filterProducts.bind(this));
    this.publisher.subscribe('PRODUCTS_SOLD', this.changeProductsAmount.bind(this));
    this.publisher.subscribe('SHOW_CART', this.cleanActions.bind(this));
    this.model.addAction(this.model.filterProducts.bind(this.model), { params: { type: 'filter', value: 'availbable' }, predicate: 'AVAILABLE' });
  }

  changeProductsAmount(products) {
    this.model.changeProductsAmount(products);
  }

  setProducts(products) {
    this.model.setProducts(products);
  }

  cleanActions() {
    this.model.setActions([]);
    this.model.addAction(this.model.filterProducts.bind(this.model), { params: { type: 'filter', value: 'availbable' }, predicate: 'AVAILABLE' });
  }
  
  deleteAction(e) {
    const id = Number(e.target.dataset.actionId);
    this.model.deleteAction(id);
    this.showProducts();
  }

  filterProducts(params) {
    this.model.addAction(this.model.filterProducts.bind(this.model), { params: { type: 'filter', ...params }, predicate:'MATCH' });
    this.showProducts();
  }

  showProducts() {
    console.log('show')
    const currentProducts = this.model.getCurrentProducts();
    const actions = this.model.getActions();
    this.pagination.setElements(currentProducts);
    this.view.cleanMain()
    this.view.renderActionTags(actions);
    this.pagination.showElements();
  }

  sortProducts(sortParam) {
    this.model.addAction(this.model.sortProducts, { params: { type: 'sort', property: sortParam } });
    this.showProducts();
  }

  showProductInfo(id) {
    const product = this.model.getProduct(id);
    this.view.renderProductInfo(product);
  }

  chooseProduct(currId) {
    const { product_name, price, id, amount } = this.model.getProduct(currId);
    this.publisher.notify('CHOOSE_TO_ADD', { product_name, price, id, amount });
  }
}