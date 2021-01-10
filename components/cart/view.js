export default class CartView {
  constructor(callbacks) {
    this.init();
    this.dom = {
      mainContent: document.querySelector('.main-container'),
      modal: document.querySelector('#mainModal'),
      openCart: document.querySelector('.open-cart'),
    };
    this.callbacks = callbacks;
    this.dom.openCart.addEventListener('click', this.callbacks.showCart); 
  }

  init() {
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
    <div class="row justify-content-center">
      <button type="button" class="col-2 btn btn-success ${products.length === 0 ? 'invisible': ''} make-order" data-bs-toggle="modal" data-bs-target="#mainModal">
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
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.callbacks.selectProduct(id);
      });
    });
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.callbacks.delete(id);
      })
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
          <button class="btn btn-primary change-btn" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#mainModal">Change count</button>
          <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete product</button>
        </td>
      </tr>
    `;
  }
  /*
  renderCustomerForm() {
    this.dom.modal.firstElementChild.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Please, enter your personal data</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="personal-data-form">
            <label for="userName">Please, enter your name:</label>
            <input type="text" class="form-control" name="user-name" id="userName" required pattern="[a-zA-Z]{2,}">
            <label for="userPhone">Please, enter your phone number:</label>
            <div class="input-group mb-3">
              <span class="input-group-text">000-000-00-00</span>
              <input type="tel" class="form-control" id="userPhone" name="user-phone" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}">
            </div>
            <label for="userEmail">Please, enter your email:</label>
            <div class="input-group mb-3">
              <span class="input-group-text">username@example.com</span>
              <input type="email" class="form-control" id="userEmail" name="user-email">
            </div>
            <button type="submit" class="btn btn-primary buy-btn" >Buy</button>       
          </form>
        </div>
      </div>
    `
    const dataForm = document.querySelector('.personal-data-form');
    dataForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = e.target.elements['user-name'].value;
      const phone = e.target.elements['user-phone'].value;
      const email = e.target.elements['user-email'].value;
      this.callbacks.buy({ name, phone, email });
    });
  }

  renderPurchaseSuccess() {
    this.dom.modal.firstElementChild.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-center text-success">Congratulations</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="text-center text-success">You have made succesfully purchase! Thanks for choosing our store</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    `;
  }

  renderPurchaseError() {
    this.dom.modal.firstElementChild.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-center text-danger">Sorry, an error occured!</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="text-center text-danger">Please, try to make your purchase a bit later.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    `;
  }*/
  
}