export default class PaginationModel {
  constructor() {
    this.elements = [];
    this.capacity = 10;
  }

  setElements(elements) {
    this.elements = elements;
  }

  getElements() {
    return this.elements;
  }
  
  getCapacity() {
    return this.capacity;
  }

  getPageCount() {
    const elementsCount = this.getElements().length;
    const capacity = this.getCapacity();
    return Math.ceil(elementsCount / capacity);
  }

  getPageElements(page) {
    const elements = this.getElements();
    const productsPerPage = this.getCapacity();
    return elements.slice((page - 1) * productsPerPage, page * productsPerPage);
  }
}