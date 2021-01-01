export default class StoreView {
  constructor() {
    this.isSpinnerShown = false;
    this.dom = {
      modalSpinner: document.getElementById('spinner'),
    }
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
}