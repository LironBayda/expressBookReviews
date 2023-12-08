const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });


  let get_books = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify({books},null,4))
    },6000)})


// Get the book list available in the shop
public_users.get('/',function (req, res) {
get_books.then((data)=>{ res.send(JSON.stringify({books},null,4))})
 
});



function get_books_isbn (isbn)
{
    return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[isbn])
    },6000)})
}




// Get book details based on ISBN Array.from(books)
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;    
    get_books_isbn(isbn).then((data)=>{ res.send(data);})
 });
  
 function get_books_author (author)
{    filtered_books=[]
    return new Promise((resolve,reject) => {
    setTimeout(() => {
    try
        {
        for (const key in books) {
            if (books.hasOwnProperty(key) && books[key].author === author) {
                filtered_books.push(books[key]);
            }
        }
        resolve(filtered_books)
    }catch (error)
    {
    reject(error)
    }
       
    },6000)})
}


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
 
    get_books_author(author).then((data)=>{ res.send(data);})
      
  
     });

     function get_books_title (title)
     {
        filtered_books=[]
         return new Promise((resolve,reject) => {
         setTimeout(() => {
         try
             {
             for (const key in books) {
                 if (books.hasOwnProperty(key) && books[key].title === title) {
                     filtered_books.push(books[key]);
                 }
             }
             resolve(filtered_books)
         }catch (error)
         {
         reject(error)
         }
            
         },6000)})
     }


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    get_books_title(title).then((data)=>{ res.send(data);})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;    
    let reviews = books[isbn].reviews;
    let title = books[isbn].title;

    res.send("the reviews of the book "+title+ ":" + JSON.stringify({reviews}));
      
});

module.exports.general = public_users;
