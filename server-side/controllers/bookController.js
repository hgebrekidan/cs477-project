const Product = require('../models/book');

exports.getBooks = (req, res, next) => {
    res.status(200).json();
}

exports.getBookByISNB = (req, res, next) => {
    res.status(200).json(Book.findByISNB(req.params.ISNB));
}

exports.save = (req, res, next) => {
    const book = req.body;
    const savedBook = new Book().save();
    res.status(201).json(savedBook);
}

exports.update = (req, res, next) => {
    const book = req.body;
    const updatedBook = new Book().update();
    res.status(200).json(updatedBook);
}

exports.deleteByNSNB = (req, res, next) => {
    Book.deleteByISNB(req.params.ISNB);
    res.status(200).end();
}