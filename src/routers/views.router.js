import express from "express";
import * as viewsController from '../controllers/views.controller.js'

const viewsRouter = express.Router();

viewsRouter.get('/chat', viewsController.getChat)

viewsRouter.get("/", viewsController.login);

viewsRouter.get('/cart/:cartID', viewsController.getCart)

viewsRouter.get('/products', viewsController.getProducts);

viewsRouter.get("/realtimeproducts", viewsController.getRealTimeProducts);

viewsRouter.get('/register', viewsController.registerUser);

viewsRouter.get('/usercenter', viewsController.getUserCenter);

export default viewsRouter;