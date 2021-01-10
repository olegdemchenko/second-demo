export default class HistoryModel {
  addOrder(order) {
    const date = new Date();
    localStorage.setItem(date, order);
  }
    
  getOrders() {
    const orders = Object.entries(localStorage);
    return orders.map(([date, orderInfo]) => [date, JSON.parse(orderInfo)]);
  }
}