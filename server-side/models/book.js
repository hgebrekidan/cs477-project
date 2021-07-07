let books = [];
class Book{
    constructor(id , title , price , ISBN , description){
        this.id = id;
        this.title = title;
        this.price = price;
        this.ISBN = ISBN;
        this.description = description;
        }
    static getAll(){
            return books;
    }
    save(){
        this.id = Math.random().toString();
        books.push(this);
        return this;
    }
    static find(bookId){
        const index = books.findIndex(item=>item.id===bookId);
        if(index > -1){
            return books[index];
        }else{
            throw new Error('Not Found');
        }
    }
    update(){
        const index = books.findIndex(item => item.id === this.id);
        if (index > -1) {
            books.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }
    }
    static fetchAll(){
        return books;
    }
    static delete(bookId){
        const index = books.findIndex(item=>item.id===bookId);
        if(index > -1){
            books=books.filter(item=>item.id!==bookId);
        }else{
            throw new Error('Not Found');
        }
    }

}
module.exports = Book;