import express from "express";
import * as cartsController from '../controllers/carts.controller.js'

const cartsRouter = express.Router();

cartsRouter.post('/', cartsController.createCart)
cartsRouter.get('/:cartID', cartsController.getCart)
cartsRouter.put('/:cartID/', cartsController.updateCart)
cartsRouter.put('/:cartID/product/:productID', cartsController.updateQuantity)
cartsRouter.post('/:cartID/product/:productID/:quantity', cartsController.addProductToCart)
cartsRouter.delete('/:cartID', cartsController.deleteCart)
cartsRouter.delete('/:cartID/product/:productID', cartsController.deleteProductFromCart)

export default cartsRouter;