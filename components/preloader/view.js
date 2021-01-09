export default class PrealoderView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.dom = {
      modalSpinner: document.querySelector('#spinner'),
    }
    this.spinner = new bootstrap.Modal(this.dom.modalSpinner, { backdrop: 'static' });
    this.dom.modalSpinner.addEventListener('shown.bs.modal', this.callbacks.changeStatus);
    this.dom.modalSpinner.addEventListener('hidden.bs.modal', this.callbacks.changeStatus);
  }

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }
}