const users = [];
class User {
    constructor(firstname, lastname, username, password, role){
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.role = role;
    }
    login(){
        return users.find(user.username === this.username && user.password === this.password)
    }
    signup(){
        const newuser = new User(this.firstname , this.lastname , this.username, this.password , this.role);
        users.push(newuser);
    }
}

module.exports = User;