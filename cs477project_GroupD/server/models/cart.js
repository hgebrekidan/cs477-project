const { ObjectID } = require("mongodb");
const { getDb } = require("../utils/database");



module.exports = class Cart {

    static save(data) {
    return getDb().collection('cart').insertOne(data);
    }
    static findByuserName(username) {
        return getDb().collection('cart').find({ username: username }).toArray();
    }
    static findByid(id) {
        return getDb().collection('cart').findOne({ _id: new ObjectID(id) })//.toArray();  
    }
    
    static getCart() {
        return getDb().collection('cart').find();
    }

    static delete(id) {
        return getDb().collection('cart').deleteOne({ _id: new ObjectID(id)});
    }
    static deletebyUsername(username) {
        return getDb().collection('cart').delete({username: username});
    }
};