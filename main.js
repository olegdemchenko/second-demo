import PrealoderController from './components/preloader/controller.js';
import StoreController from './components/app/controller.js';
import CategoryController from './components/category/controller.js';
import ProductDetailsController from './components/productDetails/controller.js';
import ProductController from './components/product/controller.js';
import HistoryController from './components/history/controller.js';
import TemporaryProductController from './components/temporaryProduct/controller.js';
import CustomerInfoController from './components/customerInfo/controller.js'
import CartController from './components/cart/controller.js';
import Publisher from './helpers/publisher.js';

const storePublisher = Publisher.getInstance();
new PrealoderController(storePublisher);
new ProductDetailsController(storePublisher);
new ProductController(storePublisher);
new CategoryController(storePublisher);
new HistoryController(storePublisher);
new TemporaryProductController(storePublisher);
new CustomerInfoController(storePublisher);
new CartController(storePublisher);
new StoreController(storePublisher);
