export default class CategoryView {
  constructor(callbacks) {
    this.dom = {
      dropdown: document.querySelector('.dropdown-menu'),
      mainContainer: document.querySelector('.main-container'),
    };
   
    this.callbacks = callbacks;
  }

  render(categories) {
    this.dom.dropdown.innerHTML = categories.map(this.createLink).join('');
    this.dom.mainContainer.innerHTML = categories.map(this.createCard).join('');
    const domCategories = document.querySelectorAll(`a[data-category]`);
    [...domCategories].forEach((category) => category.addEventListener('click', this.callbacks.choose));
  }

  createLink(name) {
    return `<li><a class="dropdown-item" href="#" data-category="${name}">${name}</a></li>`;
  }

  createCard(name) {
    return (
      `<div class="col">
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