const express = require("express");
const router = express.Router();
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
  getSingleBookByName,
} = require("../controllers/book-controller");




module.exports = router;
