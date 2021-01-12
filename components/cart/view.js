export default class CartView {
  constructor(callbacks) {
    this.initRender();
    this.dom = {
      mainContent: document.querySelector('.main-container'),
      modal: document.querySelector('#mainModal'),
      openCart: document.querySelector('.open-cart'),
    };
    this.callbacks = callbacks;
    this.dom.openCart.addEventListener('click', this.callbacks.showCart); 
  }

  initRender() {
    const navbarContainer = document.querySelector('.navbar-nav');
    navbarContainer.insertAdjacentHTML('beforeend', 
    `<li class="nav-item me-4">
       <a class="nav-link open-cart" href="#">Cart</a>
     </li>`);
  }

  renderCart(products, totalPrice) {
    this.dom.mainContent.innerHTML = `
    <div class="d-flex justify-content-center"><button class="btn btn-primary show-history">Show order's history</button></div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Count</th>
          <th scope="col">Total price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(this.renderCartProduct).join('')}
      </tbody>
    </table>
    <div class="text-center fs-2">Total price: ${totalPrice}</div>
    <div class="d-flex justify-content-center">
      <button type="button" class="px-5 btn btn-success ${products.length === 0 ? 'invisible': ''} make-order" data-bs-toggle="modal" data-bs-target="#mainModal">
        Make an order
      </button>
    </div>
    `;
    const changeBtns = [...document.querySelectorAll('.change-btn')];
    const deleteBtns = [...document.querySelectorAll('.delete-btn')];
    const makeOrderBtn = document.querySelector('.make-order');
    const showHistoryBtn = this.dom.mainContent.querySelector('.show-history');
    showHistoryBtn.addEventListener('click', this.callbacks.showHistory);
    changeBtns.forEach((btn) => {
      btn.addEventListener('click', this.callbacks.selectProduct);
    });
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', this.callbacks.delete);
    });
    makeOrderBtn.addEventListener('click', this.callbacks.showCustomerForm);
  }

  renderCartProduct(product, index) {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${product.product_name}</td>
        <td>${product.count}</td>
        <td>${product.total_price}</td>
        <td>
          <button class="btn btn-primary mt-1 change-btn" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#mainModal">Change count</button>
          <button class="btn btn-danger mt-1 delete-btn" data-id="${product.id}">Delete product</button>
        </td>
      </tr>
    `;
  }
  
}