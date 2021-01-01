export default class ProductView {
  constructor(callbacks) {
    this.dom = {
      mainContainer: document.querySelector('.main-container'),
      searchForm: document.querySelector('.search-form'),
      buyModal: document.getElementById('buyProduct'),
    }
    this.callbacks = callbacks;
    this.dom.searchForm.addEventListener('submit', this.callbacks.search);
  }

  renderProducts(products) {
    console.log(products);
    this.dom.mainContainer.innerHTML = 
    `<div class="col"><a href="#" class="d-block btn btn-primary" data-sort="price">Sort by price</a></div>
     ${products.map(this.renderProductCard).join('')}
    `;
    const sortButton = document.querySelector('a[data-sort]');
    sortButton.addEventListener('click', this.callbacks.sort);
    const infoButtons = [...document.querySelectorAll('.product-info')];
    const buyButtons = [...document.querySelectorAll('.product-buy')];
    buyButtons.forEach((btn) => btn.addEventListener('click', this.callbacks.prepareOrder));
    infoButtons.forEach((btn) => btn.addEventListener('click', this.callbacks.showInfo));
  }

  renderProductCard(product) {
    return (
      `<div class="col">
         <div class="card align-items-center text-center border-white">
           <img src="${product.img_link}" class="card-img-top" style="width: 200px; height:200px" alt="...">
           <div class="card-body">
             <h5 class="card-title">${product.product_name}</h5>
             <p class="card-text">Price: ${product.price}</p>
             <p class="card-text">Units: ${product.units}</p>
             <a href="#" class="btn btn-primary product-buy" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#buyProduct">Add to cart</a>
             <a href="#" class="btn btn-primary product-info" data-id="${product.id}">More info</a>
           </div>
         </div>
       </div>`
    );
  }

  renderProductInfo(product) {
    this.dom.mainContainer.innerHTML = (
      `<img src="${product.img_link}" class="rounded mx-auto d-block" alt="...">
       <table class="table">
         <thead>
           <tr>
             <th scope="col">Param</th>
             <th scope="col">Description</th>
           </tr>
         </thead>
         <tbody>
           ${this.renderTableRows(product)}
         </tbody>
       </table>
       <a href="#" class="btn btn-primary mt-3 mx-auto product-buy" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#buyProduct">Add to cart</a>`
    );
    const btn = this.dom.mainContainer.querySelector('.product-buy');
    btn.addEventListener('click', this.callbacks.prepareOrder);
  }

  renderOrderForm({ product_name, price, id }) {
    this.dom.buyModal.firstElementChild.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Please, select a count of product</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <p class="order-product-name"></p>
          <label for="productCount">Count of product</label>
          <input type="number" name="product-count" id="productCount" value="1" min="0">
          <p>Total price: <span class="order-total-price"></span></p>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div> `;
    const orderName = document.querySelector('.order-product-name');
    const orderPrice = document.querySelector('.order-total-price');
    const countInput = document.getElementById('productCount');
    orderName.textContent = product_name;
    orderPrice.textContent = price;
    countInput.setAttribute('data-current-product', id);
    countInput.addEventListener('input', this.callbacks.changeProdCount);
  }

  renderOrderPrice(price) {
    const priceField = document.querySelector('.order-total-price');
    priceField.textContent = price;
  }

  renderTableRows(product) {
    return Object.entries(product).sort((a, b) => b[0] - a[0]).map(([key, value]) => {
      if (key === 'img_link') {
        return '';
      }
      return (
        `<tr>
           <td>${key}</td>
           <td>${value}</td>
         </tr> `
      );
    }).join('');
  }
}