const Book = require('../models/book');

exports.getbookById = (req,res,next)=>{
    console.log(req.query)
    res.status(200).json(Book.findById(req.params.bookId))
}

exports.saveBook = (req,res,next)=>{
     const rb = req.body
    const nbook = new Book(null, rb.title, rb.price, rb.description).save()
    res.status(200).json(nbook)
}
