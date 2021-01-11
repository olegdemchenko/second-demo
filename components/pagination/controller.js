import PaginationModel from './model.js';
import PaginationView from './view.js';

export default class PaginationController {
  constructor(renderElements, containerSelector) {
    this.listeners = {
      show: this.handleShow.bind(this),
      renderElements,
    }
    this.model = new PaginationModel();
    this.view = new PaginationView(this.listeners, containerSelector);
  }

  setElements (elements) {
    this.model.setElements(elements);
  }

  handleShow(e) {
    const pageNumb = Number(e.currentTarget.dataset.pageNumb);
    this.showElements(pageNumb);
  }

  showElements (
    pageNumb = 1,
    lastPageNumb = this.model.getPageCount()
  ) {   
    const elements = this.model.getPageElements(pageNumb);
    this.view.render(elements, pageNumb, lastPageNumb);
  }
}