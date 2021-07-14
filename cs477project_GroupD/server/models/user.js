  
const { ObjectID } = require('mongodb');
const getDb = require('../utils/database').getDb;


module.exports = class User {
    constructor(_id, username, password, role) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    login() {
        return getDb().collection('users').findOne({ username: this.username, password: this.password });
    }

    signUp() {
        getDb().collection('users').insertOne({ username: this.username, password: this.password,role: this.role='member'});
        return this;
    }
     static getUserById(userName){
        return getDb().collection('users').findOne({username:userName})
    }
    // return getDb().collection('books').findOne({ _id: new ObjectID(bookId) });
    static getAllUsers(){
        return getDb().collection('users').find();
    }
}

//user = [new User('john', 'admin1', 'admin'), new User('bella', 'memeber', 'user')];

