const Cart = require('../models/cart');

exports.addToCart = (req, res, next)=>{
    res.status(200).json(Cart.addProduct(req.params.id, req.params.productPrice));
}

exports.deleteProduct = (req, res, next)=>{
    res.status(200).json(Cart.deleteProduct(req.params.id, req.params.productPrice));
}

exports.getAll = (req, res, next)=>{
    res.status(200).json(Cart.getCart())
}

exports.isEmpty = (req, res, next)=>{
    res.status(200).json(Cart.isEmpty())
}