export default class ProductView {
  constructor(callbacks) {
    this.initRender();
    this.dom = {
      mainContainer: document.querySelector('.main-container'),
      searchForm: document.querySelector('.search-form'),
    }
    this.callbacks = callbacks;
    this.dom.searchForm.addEventListener('submit', this.callbacks.search);
  }

  initRender() {
    const navbarContainer = document.querySelector('.navbar-nav');
    navbarContainer.insertAdjacentHTML('afterend', 
    `<form class="d-flex search-form">
       <input class="form-control me-3" name="search-value" type="search" placeholder="Search" aria-label="Search">
       <select class="form-select me-3" name="search-type" > 
         <option value="product_name" selected>Name</option>
         <option value="manufacture">Manufacturer</option>
         <option value="id">id</option>
       </select>
       <button class="btn btn-outline-success" type="submit">Search</button>
     </form>`);
  }

  cleanMain() {
    this.dom.mainContainer.innerHTML = '';
  }

  renderProducts(products) {
    let productsContainer = this.dom.mainContainer.querySelector('.products-container');
    if (!productsContainer) {
      const container = document.createElement('div');
      container.classList.add('row', 'g-4', 'mt-1', 'products-container');
      this.dom.mainContainer.append(container);
      productsContainer = container;
    }
    if (products.length === 0) {
      productsContainer.innerHTML = '<div class="p-4 fs-2">Sorry, but we don`t have any products, which match current requirements</div>';
      return;
    }
    productsContainer.innerHTML = 
    `<div class="row justify-content-center p-3"><a href="#" class="col-2 d-block btn btn-primary" data-sort="price">Sort by price</a></div>
     ${products.map(this.renderProductCard).join('')}
    `;
    const sortButton = productsContainer.querySelector('a[data-sort]');
    sortButton.addEventListener('click', this.callbacks.sort);
    const infoButtons = [...productsContainer.querySelectorAll('.product-info')];
    const buyButtons = [...productsContainer.querySelectorAll('.product-buy')];
    buyButtons.forEach((btn) => btn.addEventListener('click', this.callbacks.choose));
    infoButtons.forEach((btn) => btn.addEventListener('click', this.callbacks.showInfo));
  }

  renderActionTags(actions) {
    this.dom.mainContainer.insertAdjacentHTML('afterbegin',
     `<div>
       ${actions.map((action) => this.renderAction(action)).join('')}
      </div>
     `);
    const deleteBtns = [...this.dom.mainContainer.querySelectorAll('.delete-action')];
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', this.callbacks.deleteAction);
    });
  }

  renderAction({ id, params: { params } }) {
    return `
      <div class="d-inline-block bg-primary rounded-3 text-light p-3 mt-3 ms-3 ">
        <strong class="align-top">${Object.values(params).join(',  ')}</strong>
        <button type="button" class="btn-close ms-2 delete-action" data-action-id="${id}"></button>
      </div>
    `;
  }

  renderProductCard(product) {
    return (
      `<div class="col-12 col-sm-6 col-md-4">
         <div class="card align-items-center text-center border-white">
           <img src="${product.img_link}" class="card-img-top" style="width: 200px; height:200px" alt="...">
           <div class="card-body">
             <h5 class="card-title">${product.product_name}</h5>
             <p class="card-text">Manufacture: ${product.manufacture}</p>
             <p class="card-text">Price: ${product.price}</p>
             <p class="card-text">Units: ${product.units}</p>
             <a href="#" class="btn btn-primary product-buy" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#mainModal">Add to cart</a>
             <a href="#" class="btn btn-primary product-info" data-id="${product.id}">More info</a>
           </div>
         </div>
       </div>`
    );
  }
  
}