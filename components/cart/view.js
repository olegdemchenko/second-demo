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

  renderOrderForm({ product_name, price, id, total_price, count }, addCallback) {
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
              <label for="disabledName" class="form-label">Product price</label>
              <input type="text" id="disabledName" name="product-price" value="${price}" class="form-control order-product-name" readonly>
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
      const count = e.target.value;
      this.callbacks.changeProdPrice(count);
    });
    addBtn.addEventListener('click', () => {
      addCallback();
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