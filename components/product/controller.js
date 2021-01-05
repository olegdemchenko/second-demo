import ProductView from './view.js';
import ProductModel from './model.js';
import PaginationController from '../pagination/controller.js';

export default class ProductController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      showInfo: this.showProductInfo.bind(this),
      sort: this.sortProducts.bind(this),
      search: this.filterProducts.bind(this),
      choose: this.chooseProduct.bind(this),
    };
    this.view = new ProductView(this.listeners);
    this.model = new ProductModel();
    this.pagination = new PaginationController(this.view.renderProducts.bind(this.view));
    this.publisher.subscribe('LOAD_GOODS', this.setProducts.bind(this));
    this.publisher.subscribe('SHOW_CATEGORIES', this.model.cleanActions.bind(this.model));
    this.publisher.subscribe('CHOOSE_CATEGORY', this.filterProducts.bind(this));
  }

  setProducts(products) {
    this.model.setProducts(products);
  }

  filterProducts(params) {
    this.model.addActions([this.model.filterProducts, [params]]);
    this.showProducts();
  }

  showProducts() {
    const currentProducts = this.model.getCurrentProducts();
    this.pagination.setElements(currentProducts);
    this.pagination.showElements();
  }

  sortProducts(sortParam) {
    this.model.addActions([this.model.sortProducts, [sortParam]]);
    this.showProducts();
  }

  showProductInfo(id) {
    const product = this.model.getProduct(id);
    this.view.renderProductInfo(product);
  }

  chooseProduct(currId) {
    const { product_name, price, id } = this.model.getProduct(currId);
    this.publisher.notify('CHOOSE_TO_ADD', { product_name, price, id });
  }
}