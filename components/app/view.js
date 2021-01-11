export default class StoreView {
  constructor(callbacks) {
    this.initRender();
    this.callbacks = callbacks;
    this.dom = {
      brand: document.querySelector('.store-brand'),
    }
    this.dom.brand.addEventListener('click', this.callbacks.showMainPage);
  }
  
  initRender() {
    const navbar = document.querySelector('.navbar');
    navbar.insertAdjacentHTML('afterbegin',
     `<a class="navbar-brand fs-4 store-brand" href="#">
        <img src="./img/food-cart.png" alt="icon" width="50px" height="50px">KFS
      </a>`);
  }
  
}