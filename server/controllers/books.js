// define the book model
import books from '../models/books.js';
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {
    res.render('index', { title: 'Add a Book', page: 'books/add', books: {}});
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {
    let newBook = booksModel({
        ...req.body
    })
    
    booksModel.create(newBook, (err) =>{
        if(err){
            console.error(err);
            res.end(err);
        }

        else{
            res.redirect('/books/list')
        }
    })
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
    let id = req.params.id;
    
    booksModel.findById(id,(err, book) =>{
        if(err){
            console.error(err);
            res.end(err);
        }
        
        else{
            res.render('index', { title: 'Edit book', page: 'books/edit', book: book});
        }
    })
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    let id = req.params.id;
    
    let updatedBook = booksModel({
        _id: req.body.id,
        ...req.body
    })

    booksModel.updateOne({_id: id }, updatedBook, (err) =>{
        if(err){
            console.error(err);
            res.end(err);
        }
        
        else{
            res.redirect('/books/list');
        }
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    let id = req.params.id;

    booksModel.remove({_id: id }, (err) =>{
        if(err){
            console.error(err);
            res.end(err);
        }
        
        else{
            res.redirect('/books/list');
        }
    })
}