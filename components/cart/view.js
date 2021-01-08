export default class CartView {
  constructor(callbacks) {
    this.dom = {
      mainContent: document.querySelector('.main-container'),
      buyModal: document.getElementById('buyProduct'),
      openCart: document.querySelector('.open-cart'),
    };
    this.callbacks = callbacks;
    this.dom.openCart.addEventListener('click', this.callbacks.showCart); 
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
      <button type="button" class="col-2 btn btn-success ${products.length === 0 ? 'invisible': ''} make-order" data-bs-toggle="modal" data-bs-target="#buyProduct">
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
          <button class="btn btn-primary change-btn" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#buyProduct">Change count</button>
          <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete product</button>
        </td>
      </tr>
    `;
  }

  renderOrderForm({ product_name, price, id, total_price, count, amount }, addCallback) {
    this.dom.buyModal.firstElementChild.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Please, select a count of product</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="mb-3">
              <label for="disabledId" class="form-label">Product id</label>
              <input type="number" id="disabledId" name="product-id" value="${id}" class="form-control order-product-id" readonly>
            </div>
            <div class="mb-3">
              <label for="disabledName" class="form-label">Product name</label>
              <input type="text" id="disabledName" name="product-name" value="${product_name}" class="form-control order-product-name" readonly>
            </div>
            <div class="mb-3">
              <label for="disabledPrice" class="form-label">Product price</label>
              <input type="text" id="disabledPrice" name="product-price" value="${price}" class="form-control order-product-price" readonly>
            </div>
            <div class="mb-3">
              <label for="disabledAmount" class="form-label">Amount</label>
              <input type="text" id="disabledName" name="product-price" value="${amount}" class="form-control order-product-amount" readonly>
            </div>
          <div class="mb-3">
            <label for="productCount">Count of product</label>
            <input type="number" class="form-control" name="product-count" id="productCount" value="${count ?? 1}" min="0"> 
            <span class="text-danger error-message"></span>  
          </div>
          <p class="fs-2">Total price: <span class="order-total-price">${total_price ?? price}</span></p>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary add-btn" data-bs-dismiss="modal">Add</button>
      </div>
    </div> `;
    const countInput = this.dom.buyModal.querySelector('input[name="product-count"]');
    const addBtn = this.dom.buyModal.querySelector('.add-btn');
    countInput.addEventListener('input', (e) => {
      const count = Number(e.target.value);
      this.callbacks.changeProdPrice(count, amount);
    });
    addBtn.addEventListener('click', () => {
      addCallback();
    });
  }

  renderHistory(history) {
    this.dom.mainContent.innerHTML = `
    <div class="d-flex justify-content-center"><button class="btn btn-primary back-to-cart">Back</button></div>
    <div class="accordion" id="ordersHistory">
      ${history.map((order, index) => this.renderHistoryOrder(order, index)).join('')}
    </div>
    `;
    const backBtn = this.dom.mainContent.querySelector('.back-to-cart');
    backBtn.addEventListener('click', this.callbacks.showCart);
  }

  renderHistoryOrder([date, { customerData, customerProducts }], index) {
    return `
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#orderInfo${index}" aria-expanded="true" aria-controls="collapseOne">
          ${date}
        </button>
      </h2>
      <div id="orderInfo${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#ordersHistory">
        <div class="accordion-body">
          <h2>Customer information</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${customerData.name}</td>
                <td>${customerData.phone}</td>
                <td>${customerData.email}</td>
              </tr>
            </tbody>
          </table>
          <h2>Products info</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product name</th>
                <th scope="col">Id</th>
                <th scope="col">Amount</th>
                <th scope="col">Count</th>
                <th scope="col">Price</th>
                <th scope="col">Total price</th>
              </tr>
            </thead>
            <tbody>
            ${customerProducts.map((prod) => this.renderHistoryProduct(prod)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `;
  }

  renderHistoryProduct(product) {
    return `
    <tr>
      <td>${product['product_name']}</td>
      <td>${product.id}</td>
      <td>${product.amount}</td>
      <td>${product.count}</td>
      <td>${product.price}</td>
      <td>${product['total_price']}</td>
    </tr>`
  }

  renderCustomerForm() {
    this.dom.buyModal.firstElementChild.innerHTML = `
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

  renderOrderPrice(price) {
    const errField = this.dom.buyModal.querySelector('.error-message');
    errField.hidden = true;
    const countInput = this.dom.buyModal.querySelector('#productCount');
    countInput.classList.remove('is-invalid');
    const priceField = document.querySelector('.order-total-price');
    priceField.textContent = price;
  }

  renderCountError(err) {
    const countInput = this.dom.buyModal.querySelector('#productCount');
    countInput.classList.add('is-invalid');
    const errField = this.dom.buyModal.querySelector('.error-message');
    errField.textContent = err;
    errField.hidden = false;
    const totalPrice = this.dom.buyModal.querySelector('.order-total-price');
    totalPrice.textContent = '';
  }
}