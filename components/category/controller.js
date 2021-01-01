import CategoryView from './view.js';
import CategoryModel from './model.js';

export default class CategoryController {
  constructor(publisher) {
    this.publisher = publisher;
    this.callbacks = {
      choose: this.chooseCategory.bind(this),
    };
    this.model = new CategoryModel();
    this.view = new CategoryView(this.callbacks);
    this.publisher.subscribe('LOAD_CATEGORIES', this.setCategories.bind(this));
    this.publisher.subscribe('SHOW_CATEGORIES', this.showCategories.bind(this));
  }
  
  setCategories(categories) {
    this.model.setCategories(categories);
  }

  showCategories() {
    const categories = this.model.getCategories();
    this.view.render(categories);
  }

  chooseCategory(e) {
    const chosenCategory = e.target.dataset.category;
    this.publisher.notify('CHOOSE_CATEGORY', { property: 'category', value: chosenCategory });
  }

}