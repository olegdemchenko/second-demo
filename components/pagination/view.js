export default class PaginationView {
  constructor(callbacks, selector) {
    this.callbacks = callbacks;
    this.containerSelector = selector;
  }

  render(elements, page, lastPage) {
    this.callbacks.renderElements(elements);
    const container = document.querySelector(this.containerSelector);
    container.insertAdjacentHTML('beforeend', this.renderPagination(page, lastPage));
    const pageButtons = [...document.querySelectorAll('li[data-page-numb]')];
    pageButtons.forEach((btn) => btn.addEventListener('click', this.callbacks.show));
  }

  renderPagination(pageNumb, lastPage) {
    if (pageNumb === 1 && lastPage <= 1) {
      return '';
    }
    const pages = this.renderPaginationLinks(pageNumb, lastPage);
    const isPrevDisabled = pageNumb === 1;
    const isNextDisabled = pageNumb === lastPage;
    return (`
    <nav aria-label="...">
      <ul class="pagination justify-content-center">
        <li class="page-item ${isPrevDisabled ? 'disabled' : ''}" ${isPrevDisabled ? '': `data-page-numb="${pageNumb - 1}"`}>
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        ${pages}
        <li class="page-item ${isNextDisabled ? 'disabled' : ''}" ${isNextDisabled ? '': `data-page-numb="${pageNumb + 1}"`}>
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
    `);
  }

  renderPaginationLinks(pageNumb, lastPage) {
    return Array(lastPage).fill('').map((page, index) => {
      if (index + 1 === pageNumb) {
        return (
          `<li class="page-item active" aria-current="page" data-page-numb="${index + 1}">
             <a class="page-link" href="#">${index + 1}</a>
           </li>`);
      }
      return `<li class="page-item" data-page-numb="${index + 1}"><a class="page-link" href="#">${index + 1}</a></li>`;
    }).join('');
  }
}