export default class ProductView {
  constructor(callbacks) {
    this.dom = {
      mainContainer: document.querySelector('.main-container'),
      searchForm: document.querySelector('.search-form'),
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
    buyButtons.forEach((btn) => btn.addEventListener('click', this.callbacks.choose));
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
    btn.addEventListener('click', this.callbacks.choose);
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