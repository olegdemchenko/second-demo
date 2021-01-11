import ProductDetailsView from './view.js';

export default class ProductDetailsController {
  constructor(publisher) {
    this.publisher = publisher;
    this.publisher.notify('SHOW_PRELOADER');
    this.listeners = {
      showProducts: this.showProducts.bind(this),
      choose: this.chooseProduct.bind(this),
    };
    this.view = new ProductDetailsView(this.listeners);
    this.publisher.subscribe('SHOW_PRODUCT_DETAILS', this.showDetails.bind(this));
  }

  showDetails(product) {
    this.view.renderDetails(product);
  }

  showProducts() {
    this.publisher.notify('SHOW_PRODUCTS')
  }

  chooseProduct(e) {
    const id = e.target.dataset.id;
    this.publisher.notify('PRODUCT_TO_CHOOSE', id);
  }

} 