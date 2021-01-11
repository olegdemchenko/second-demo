export default class CategoryView {
  constructor(callbacks) {
    this.initRender();
    this.dom = {
      dropdown: document.querySelector('.dropdown-menu'),
      mainContainer: document.querySelector('.main-container'),
    };
    this.callbacks = callbacks;
  }

  initRender() {
    const navbarContainer = document.querySelector('.navbar-nav');
    navbarContainer.insertAdjacentHTML('beforeend', 
    `<li class="nav-item dropdown me-4">
       <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         Categories
       </a>
       <ul class="dropdown-menu" aria-labelledby="navbarDropdown"></ul>
     </li>
     <li class="nav-item me-4">
       <a class="nav-link" aria-current="page" href="#" data-category="S">Top</a>
     </li>
     <li class="nav-item me-4">
       <a class="nav-link" href="#" data-category="B">Discount</a>
     </li>`); 
  }

  render(categories) {
    this.dom.dropdown.innerHTML = categories.map(this.createLink).join('');
    this.dom.mainContainer.innerHTML = categories.map(this.createCard).join('');
    const domCategories = [...document.querySelectorAll(`a[data-category]`)];
    domCategories.forEach((category) => category.addEventListener('click', this.callbacks.choose));
  }

  createLink(name) {
    return `<li><a class="dropdown-item" href="#" data-category="${name}">${name}</a></li>`;
  }

  createCard(name) {
    return (
      `<div class="col-12 col-sm-6 col-md-4 col-xl-3">
         <div class="card align-items-center text-center border-white">
           <img src="./img/${name}.svg" class="card-img-top" style="width: 200px; height:200px" alt="...">
           <div class="card-body">
             <h5 class="card-title">${name}</h5>
             <a href="#" class="btn btn-primary" data-category="${name}">Show content</a>
           </div>
         </div>
       </div>`
    );
  }
}