let books = [];

module.exports = class Book {

    constructor(id, title, price, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        books.push(this);
        return this;
    }

    update() {
        const index = books.findIndex(item => item.id === this.id);
        if (index > -1) {
            books.put(this);
            return this;
        } else {
            throw new Error('NOT Found');
        }

    }

    static fetchAll() {
        return books;
    }

    static findById(bookId) {
        const index = books.findIndex(item => item.id === BookId);
        if (index > -1) {
            return books[index];
        } else {
            throw new Error('NOT Found');
        }
    }

    static deleteById(bookId) {
        const index = books.findIndex(item => item.id === bookId);
        if (index > -1) {
            books = books.filter(item => item.id !== bookId);
        } else {
            throw new Error('NOT Found');
        }
    }

}