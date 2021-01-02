export default class CartView {
  constructor(callbacks) {
    this.dom = {
      buyModal: document.getElementById('buyProduct'),
      openCart: document.querySelector('.open-cart'),
    };
    this.callbacks = callbacks;
    this.dom.openCart.addEventListener('click', this.callbacks.showCart); 
  }

  renderOrderForm({ product_name, price, id, count }) {
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
              <input type="text" id="disabledId" name="product-id" value="${id}" class="form-control order-product-id" readonly>
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
          <p class="fs-2">Total price: <span class="order-total-price">${price}</span></p>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary add-btn" data-bs-dismiss="modal">Add</button>
      </div>
    </div> `;
    const form = this.dom.buyModal.querySelector('form');
    const addBtn = this.dom.buyModal.querySelector('.add-btn');
    form.addEventListener('input', (e) => {
      const formData = new FormData(e.currentTarget);
      this.callbacks.changeProdCount(formData.get('product-count'), formData.get('product-price'));
    });
    addBtn.addEventListener('click', () => {
      const formData = new FormData(this.dom.buyModal.querySelector('form'));
      const id = formData.get('product-id');
      const product_name = formData.get('product-name');
      const price = formData.get('product-price');
      const product_count = formData.get('product-count');
      this.callbacks.add({ id, product_name, price, count: product_count });
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