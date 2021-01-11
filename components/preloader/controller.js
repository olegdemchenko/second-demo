import PreloaderView from './view.js';
import PreloaderModel from './model.js';

export default class PreloaderController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      changeStatus: this.changeStatus.bind(this),
    }
    this.model = new PreloaderModel()
    this.view = new PreloaderView(this.listeners);
    this.publisher.subscribe('SHOW_PRELOADER', this.showPreloader.bind(this));
    this.publisher.subscribe('HIDE_PRELOADER', this.hidePrealoder.bind(this));
  }

  showPreloader() {
    const isShown = this.model.getStatus();
    if (!isShown) {
      this.view.show();
      return;
    }
    setTimeout(() => this.showPreloader(), 100);
  }

  hidePrealoder() {
    const isShown = this.model.getStatus();
    if (isShown) {
      this.view.hide();
      return;
    }
    setTimeout(() => this.hidePrealoder(), 100);
  }

  changeStatus() {
    const status = this.model.getStatus();
    this.model.setStatus(!status);
  }
}