import StoreController from './components/app/controller.js';
import CategoryController from './components/category/controller.js';
import ProductController from './components/product/controller.js';
import Publisher from './components/publisher.js';

const storePublisher = new Publisher();
new ProductController(storePublisher);
new CategoryController(storePublisher);
new StoreController(storePublisher);