const express = require('express');
const cartController = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/' , cartController.addToCart);
cartRouter.delete('/:usename', cartController.deleteProduct);
//cartRouter.delete('/:id', cartController.deleteProduct);
cartRouter.get('/', cartController.getAll);
cartRouter.get('/:username', cartController.getCartItem);
//cartRouter.get('/cart/:id', cartController.getCartItem);

//cartRouter.get('/', cartController.isEmpty);


module.exports = cartRouter;

