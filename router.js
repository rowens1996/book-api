const express = require("express");
const router = express.Router();
const books = require("./booksController");

//get all books
router.get("/", books.index);

//get book by id
router.get("/id/:id", books.showId);
//get book by Title
router.get("/title/:title", books.showTitle);
//get book by ISBN
router.get("/isbn/:isbn", books.showISBN);

//get books by Author
router.get("/author/:author", books.showAuthor);
//get books by Genre
router.get("/genre/:genre", books.showGenre);
//get books by read status (unread)
router.get("/read/:read", books.showReadStatus);

//add book
router.post("/create", books.create);

//delete book
router.delete("/:id", books.delete);

//update book title or author etc.
router.put("/:id", books.update);



module.exports = router;
