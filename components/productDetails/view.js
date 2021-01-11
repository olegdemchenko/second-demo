export default class ProductDetailsView {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.dom = {
      mainContainer: document.querySelector('.main-container'),
    }
  }

  renderDetails(product) {
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
       <div class="row justify-content-center">
         <a href="#" class="col-2 btn btn-primary mt-3 mx-auto product-buy" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#mainModal">Add to cart</a>
         <a href="#" class="col-2 btn btn-primary mt-3 mx-auto back-to-products">Back</a>
         </div>`
    );
    const buyBtn = this.dom.mainContainer.querySelector('.product-buy');
    const backBtn = this.dom.mainContainer.querySelector('.back-to-products');
    buyBtn.addEventListener('click', this.callbacks.choose);
    backBtn.addEventListener('click', this.callbacks.showProducts);
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

