import express from 'express';
import * as productsController from '../controllers/products.controller.js'

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts)
productsRouter.get('/:productID', productsController.getProduct)
productsRouter.post('/',productsController.createProduct);
productsRouter.put('/:productID', productsController.updateProduct);
productsRouter.delete('/:productID', productsController.deleteProduct);

export default productsRouter;