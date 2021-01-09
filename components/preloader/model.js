export default class PreloaderModel {
  constructor() {
    this.status = false;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }
}