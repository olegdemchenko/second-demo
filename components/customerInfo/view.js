export default class CustomerInfoView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.dom = {
      modal: document.querySelector('#mainModal'),
    }
  }

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
            <input type="text" class="form-control" name="name" id="userName"  required pattern="[a-zA-Z]{2,}">
            <label for="userPhone">Please, enter your phone number:</label>
            <div class="input-group mb-3">
              <span class="input-group-text">000-000-00-00</span>
              <input type="tel" class="form-control" id="userPhone" name="phone"  required pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}">
            </div>
            <label for="userEmail">Please, enter your email:</label>
            <div class="input-group mb-3">
              <span class="input-group-text">username@example.com</span>
              <input type="email" class="form-control" id="userEmail"  name="email">
            </div>
            <div class="d-flex justify-content-center"><button type="submit" style="width: 100px;" class="btn btn-primary buy-btn" disabled>Buy</button></div>
          </form>
        </div>
      </div>
    `;
    const dataForm = document.querySelector('.personal-data-form');
    dataForm.addEventListener('input', this.callbacks.validate);
    dataForm.addEventListener('submit', this.callbacks.buy);
  }

  renderValidationRes(results) {
    results.forEach(([type, valid]) => {
      if (valid) {
        this.renderValidInput(type);
        return;
      }
      this.renderInvalidInput(type);
    });
    const allInputsValid = results.every(([, valid]) => valid);
    const buyBtn = this.dom.modal.querySelector('.buy-btn');
    if (allInputsValid) {
      buyBtn.disabled = false;
    } else {
      buyBtn.disabled = true;
    }
  }

  renderValidInput(type) {
    const input = this.dom.modal.querySelector(`input[name=${type}]`);
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  renderInvalidInput(type) {
    const input = this.dom.modal.querySelector(`input[name=${type}]`);
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
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
  }
}