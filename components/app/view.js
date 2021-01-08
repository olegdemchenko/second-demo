export default class StoreView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.isSpinnerShown = false;
    this.dom = {
      modalSpinner: document.getElementById('spinner'),
      brand: document.querySelector('.store-brand'),
      buyModal: document.querySelector('#buyProduct'),
    }
    this.dom.brand.addEventListener('click', this.callbacks.showMainPage);
    this.dom.modalSpinner.addEventListener('shown.bs.modal', () => {
      this.isSpinnerShown = true;
    });
    this.dom.modalSpinner.addEventListener('hidden.bs.modal', () => {
      this.isSpinnerShown = false;
    });
    this.spinner = new bootstrap.Modal(this.dom.modalSpinner, { backdrop: 'static' });
  }
  
  showSpinner() {
    if (!this.isSpinnerShown) {
      this.spinner.show();
      return;
    }
    setTimeout(() => this.showSpinner(), 200);
  }

  hideSpinner() {
    if (this.isSpinnerShown) {
      this.spinner.hide();
      return;
    }
    setTimeout(() => this.hideSpinner(), 200);
  }
  /*
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
      this.callbacks.setCustomerData({ name, phone, email });
      this.callbacks.buy();
    });
  }*/
}