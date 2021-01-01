export default class CategoryModel {
  constructor() {
    this.categories = [];
  }

  getCategories() {
    return this.categories;
  }

  setCategories(categories) {
    this.categories = categories;
  }
}