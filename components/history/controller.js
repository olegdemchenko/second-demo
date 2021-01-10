import HistoryModel from './model.js';
import HistoryView from './view.js';

export default class HistoryController {
  constructor(publisher) {
    this.publisher = publisher;
    this.listeners = {
      showCart: () => this.publisher.notify('SHOW_CART'),
    }
    this.model = new HistoryModel();
    this.view = new HistoryView(this.listeners);
    this.publisher.subscribe('ADD_ORDER_TO_HISTORY', this.addOrder.bind(this));
    this.publisher.subscribe('SHOW_HISTORY', this.showHistory.bind(this));
  }

  addOrder(order) {
    this.model.addOrder(order);
  }

  showHistory() {
    const history = this.model.getOrders();
    this.view.renderHistory(history);
  }
}