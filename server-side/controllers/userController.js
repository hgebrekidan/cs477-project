const User = require('../models/user');
module.exports.signup = (req, res, next)=>{
    const user = new User(req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.role);
    res.status(200).json(user);
}