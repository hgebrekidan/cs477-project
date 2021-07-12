const express = require('express');
const cartController = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/cart/:id' , cartController.addToCart);
cartRouter.delete('/cart/:id', cartController.deleteProduct);
cartRouter.get('/', cartController.getAll);
cartRouter.get('/', cartController.isEmpty);


module.exports = cartRouter;