export default class Publisher {
  constructor() {
    this.listeners = {};
  }

  static getInstance() {
    if(!Publisher.instance) {
      Publisher.instance = new Publisher;
    }
    return Publisher.instance;
  }

  subscribe(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  notify(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }


}