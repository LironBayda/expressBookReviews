const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN Array.from(books)
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;    
    let filtered_book = books[isbn];
    res.send(filtered_book);
      

  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    filtered_books=[]
    const author = req.params.author;
    for (const key in books) {
        if (books.hasOwnProperty(key) && books[key].author === author) {
            filtered_books.push(books[key]);
        }
    }
    if (filtered_books.length > 0) {
        res.send(filtered_books);
      
    }
    else{
        res.send("Unable to find BOOK!");
    }
    return filtered_books
 });


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    filtered_books=[]
    const title = req.params.title;
    for (const key in books) {
        if (books.hasOwnProperty(key) && books[key].title === title) {
            filtered_books.push(books[key]);
        }
    }
    if (filtered_books.length > 0) {
        res.send(filtered_books);
      
    }
    else{
        res.send("Unable to find BOOK!");
    }
    return filtered_books
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;    
    let reviews = books[isbn].reviews;
    let title = books[isbn].title;

    res.send("the reviews of the book "+title+ ":" + JSON.stringify({reviews}));
      
});

module.exports.general = public_users;
