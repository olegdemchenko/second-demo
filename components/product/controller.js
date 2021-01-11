import ProductView from './view.js';
import ProductModel from './model.js';
import PaginationController from '../pagination/controller.js';

export default class ProductController {
  constructor(publisher) {
    this.publisher = publisher;
    this.publisher.notify('SHOW_PRELOADER');
    this.listeners = {
      showInfo: this.showProductInfo.bind(this),
      showProducts: this.showProducts.bind(this),
      sort: this.sortProducts.bind(this),
      search: this.handleSearch.bind(this),
      choose: this.chooseProduct.bind(this),
      deleteAction: this.deleteAction.bind(this),
    };
    this.view = new ProductView(this.listeners);
    this.model = new ProductModel();
    this.pagination = new PaginationController(this.view.renderProducts.bind(this.view), '.products-container');
    this.publisher.subscribe('LOAD_GOODS', this.setProducts.bind(this));
    this.publisher.subscribe('SHOW_CATEGORIES', this.setDefaultActions.bind(this));
    this.publisher.subscribe('CHOOSE_CATEGORY', this.chooseCategory.bind(this));
    this.publisher.subscribe('PRODUCTS_SOLD', this.changeProductsAmount.bind(this));
    this.publisher.subscribe('SHOW_PRODUCTS', this.showProducts.bind(this));
    this.publisher.subscribe('PRODUCT_TO_CHOOSE', this.chooseProduct.bind(this));
    this.setDefaultActions();
  }

  changeProductsAmount(products) {
    this.model.changeProductsAmount(products);
  }

  setProducts(products) {
    this.model.setProducts(products);
  }

  setDefaultActions() {
    this.model.setActions([]);
    this.model.addAction(this.model.filterProducts.bind(this.model), { params: { type: 'filter', value: 'availbable' }, predicate: 'AVAILABLE' });
  }
  
  chooseCategory(params) {
    this.setDefaultActions();
    this.filterProducts(params);
  }

  deleteAction(e) {
    const id = Number(e.target.dataset.actionId);
    this.model.deleteAction(id);
    this.showProducts();
  }

  handleSearch(e) {
    e.preventDefault();
    const property = e.target.elements['search-type'].value;
    const value = e.target.elements['search-value'].value;
    this.filterProducts({ property, value });
    e.target.elements['search-value'].value = '';
  }

  filterProducts(params) {
    this.model.addAction(this.model.filterProducts.bind(this.model), { params: { type: 'filter', ...params }, predicate:'MATCH' });
    this.showProducts();
  }

  showProducts() {
    const currentProducts = this.model.getCurrentProducts();
    const actions = this.model.getActions();
    this.pagination.setElements(currentProducts);
    this.view.cleanMain()
    this.view.renderActionTags(actions);
    this.pagination.showElements();
  }

  sortProducts(e) {
    const sortParam = e.target.dataset.sort;
    this.model.addAction(this.model.sortProducts, { params: { type: 'sort', property: sortParam } });
    this.showProducts();
  }

  showProductInfo(e) {
    const id = e.target.dataset.id;
    const product = this.model.getProduct(id);
    this.publisher.notify('SHOW_PRODUCT_DETAILS', product);
  }

  chooseProduct(e) {
    const currId = e.target.dataset.id;
    const { product_name, price, id, amount } = this.model.getProduct(currId);
    this.publisher.notify('CHOOSE_TO_ADD', { product_name, price, id, amount });
  }
}