export default class HistoryView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.dom = {
      mainContent: document.querySelector('.main-container'),
    }
  }

  renderHistory(history) {
    this.dom.mainContent.innerHTML = `
    <div class="d-flex justify-content-center"><button class="btn btn-primary back-to-cart">Back</button></div>
    <div class="accordion" id="ordersHistory">
      ${history.map((order, index) => this.renderHistoryOrder(order, index)).join('')}
    </div>
    `;
    const backBtn = this.dom.mainContent.querySelector('.back-to-cart');
    backBtn.addEventListener('click', this.callbacks.showCart);
  }

  renderHistoryOrder([date, { customerData, customerProducts }], index) {
    return `
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#orderInfo${index}" aria-expanded="true" aria-controls="collapseOne">
          ${date}
        </button>
      </h2>
      <div id="orderInfo${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#ordersHistory">
        <div class="accordion-body">
          <h2>Customer information</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${customerData.name}</td>
                <td>${customerData.phone}</td>
                <td>${customerData.email}</td>
              </tr>
            </tbody>
          </table>
          <h2>Products info</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product name</th>
                <th scope="col">Id</th>
                <th scope="col">Amount</th>
                <th scope="col">Count</th>
                <th scope="col">Price</th>
                <th scope="col">Total price</th>
              </tr>
            </thead>
            <tbody>
            ${customerProducts.map((prod) => this.renderHistoryProduct(prod)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `;
  }

  renderHistoryProduct(product) {
    return `
    <tr>
      <td>${product['product_name']}</td>
      <td>${product.id}</td>
      <td>${product.amount}</td>
      <td>${product.count}</td>
      <td>${product.price}</td>
      <td>${product['total_price']}</td>
    </tr>`
  }
}