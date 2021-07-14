const Cart = require('../models/cart');

exports.addToCart = (req, res, next)=>{
    return res.status(200).json(Cart.save(req.body));
}
exports.getCartItem= (req,res,next)=>{
    // if(req.params.id==!undefined){
    //     res.status(200).json(Cart.findByid(req.params.id));
    // }else if(req.params.username==!undefined){
    return res.status(200).json(Cart.findByuserName(req.params.username));
    // }  
}

exports.deleteProduct = (req, res, next)=>{
    if(req.params.id==!undefined){
       return res.status(200).json(Cart.delete(req.params.id)); 
    }else if(req.params.username!==undefined){
       return res.status(200).json(Cart.deletebyUsername(req.params.username));
    }
    
}

exports.getAll = (req, res, next)=>{
    return res.status(200).json(Cart.getCart());
}

exports.isEmpty = (req, res, next)=>{
    res.status(200).json(Cart.isEmpty())
}