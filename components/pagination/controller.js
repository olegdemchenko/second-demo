import PaginationModel from './model.js';
import PaginationView from './view.js';

export default class PaginationController {
  constructor(renderElements, containerSelector) {
    this.listeners = {
      show: this.showElements.bind(this),
      renderElements,
    }
    this.model = new PaginationModel();
    this.view = new PaginationView(this.listeners, containerSelector);
  }

  setElements (elements) {
    this.model.setElements(elements);
  }

  showElements (
    pageNumb = 1,
    lastPageNumb = this.model.getPageCount()
  ) {   
    const elements = this.model.getPageElements(pageNumb);
    this.view.render(elements, pageNumb, lastPageNumb);
  }
}