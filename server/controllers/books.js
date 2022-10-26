// Filename: books.js
// Author Name: Siddharth Verma
// Student ID: 301207026
// Web App Name: Book Collection (COMP229 Midterm)
// Date: Oct 24, 2022


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

//  Display/render the page where the user can add a book to the database
export function displayAddPage(req, res, next) {
    res.render('index', { title: 'Add a Book', page: 'books/add', books: {}});
}

// Process the user's request to add a book to the database
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

// Display/render the page where the user can edit/update a book already in the database
export function displayEditPage(req, res, next) {
    let id = req.params.id;
    
    booksModel.findById(id,(err, book) =>{
        if(err){
            console.error(err);
            res.end(err);
        }
        
        else{
            res.render('index', { title: 'Edit Book Details', page: 'books/edit', book: book});
        }
    })
}

// Process the user's request to edit/update a book in the database
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

// Process the user's request to delete a book in the database
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