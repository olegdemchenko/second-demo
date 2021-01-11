export default class TemporaryProductView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.dom = {
      modal: document.querySelector('#mainModal'), 
    }
  }

  renderTempProduct(product) {
    this.dom.modal.firstElementChild.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Please, select a count of product</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="mb-3">
              <label for="disabledId" class="form-label">Product id</label>
              <input type="number" id="disabledId" name="product-id" value="${product.id}" class="form-control order-product-id" readonly>
            </div>
            <div class="mb-3">
              <label for="disabledName" class="form-label">Product name</label>
              <input type="text" id="disabledName" name="product-name" value="${product.product_name}" class="form-control order-product-name" readonly>
            </div>
            <div class="mb-3">
              <label for="disabledPrice" class="form-label">Product price</label>
              <input type="text" id="disabledPrice" name="product-price" value="${product.price}" class="form-control order-product-price" readonly>
            </div>
            <div class="mb-3">
              <label for="disabledAmount" class="form-label">Amount</label>
              <input type="text" id="disabledName" name="product-price" value="${product.amount}" class="form-control order-product-amount" readonly>
            </div>
          <div class="mb-3">
            <label for="productCount">Count of product</label>
            <input type="number" class="form-control" name="product-count" id="productCount" value="${product.count ?? 1}" min="0"> 
            <span class="text-danger error-message"></span>  
          </div>
          <p class="fs-2">Total price: <span class="order-total-price">${product.total_price ?? price}</span></p>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary add-btn" data-bs-dismiss="modal">Add</button>
      </div>
    </div> `;
    const countInput = this.dom.modal.querySelector('input[name="product-count"]');
    const addBtn = this.dom.modal.querySelector('.add-btn');
    countInput.addEventListener('input', this.callbacks.changeCount);
    addBtn.addEventListener('click', this.callbacks.send);
  }

  renderPrice(price) {
    const errField = this.dom.modal.querySelector('.error-message');
    errField.hidden = true;
    const countInput = this.dom.modal.querySelector('#productCount');
    countInput.classList.remove('is-invalid');
    const priceField = document.querySelector('.order-total-price');
    priceField.textContent = price;
  }

  renderCountError(err) {
    const countInput = this.dom.modal.querySelector('#productCount');
    countInput.classList.add('is-invalid');
    const errField = this.dom.modal.querySelector('.error-message');
    errField.textContent = err;
    errField.hidden = false;
    const totalPrice = this.dom.modal.querySelector('.order-total-price');
    totalPrice.textContent = '';
  }
}