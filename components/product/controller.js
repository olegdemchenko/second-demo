import ProductView from './view.js';
import ProductModel from './model.js';

export default class ProductController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      showInfo: this.showProductInfo.bind(this),
      sort: this.sortProducts.bind(this),
      search: this.searchProducts.bind(this),
      prepareOrder: this.prepareOrder.bind(this),
      changeProdCount: this.changeProdCount.bind(this),
      addToCart: this.addToCart.bind(this),
    };
    this.view = new ProductView(this.listeners);
    this.model = new ProductModel();
    this.publisher.subscribe('LOAD_GOODS', this.setProducts.bind(this));
    this.publisher.subscribe('CHOOSE_CATEGORY', this.selectProducts.bind(this));
    this.publisher.subscribe('CHOOSE_CATEGORY', this.setProductParams.bind(this));
  }

  setProducts(products) {
    this.model.setProducts(products);
  }

  setProductParams(params) {
    this.model.setProductParams(params);
  }

  searchProducts(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const property = formData.get('search-type');
    const value = formData.get('search-value');
    return this.selectProducts({ property, value });
  }

  selectProducts(productData) {
    const products = this.model.getProducts(productData);
    this.view.renderProducts(products);
  }

  showProductInfo(e) {
    const id = e.target.dataset.id;
    const product = this.model.getProduct(id);
    this.view.renderProductInfo(product);
  }

  sortProducts(e) {
    const sortParam = e.target.dataset.sort;
    const currentProducts = this.model.getProducts(this.model.getProductParams());
    const sortedProducts = this.model.sortProducts(sortParam, currentProducts);
    this.view.renderProducts(sortedProducts);
  }

  addToCart() {

  }

  prepareOrder(e) {
    const id = e.target.dataset.id;
    const productData = this.model.getProduct(id);
    this.view.renderOrderForm(productData);
  }

  changeProdCount(e) {
    const count = e.target.value;
    const id = e.target.dataset.currentProduct;
    const product = this.model.getProduct(id);
    const newPrice = this.model.calculatePrice(product.price, count);
    this.view.renderOrderPrice(newPrice);
  }
}