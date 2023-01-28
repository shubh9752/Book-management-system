const express = require("express");
const router = express.Router();
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
// const {
//   getAllBooks,
//   getSingleBookById,
//   getAllIssuedBooks,
//   addNewBook,
//   updateBookById,
//   getSingleBookByName,
// } = require("../controllers/book-controller");
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});
//getting the book details by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((eachBook) => eachBook.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book id not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: book,
  });
});
//creating route for all issued books
router.get("/issued/book", (req, res) => {
  const userIsIssuedBook = users.filter((eachUser) => {
    if (eachUser.issuedBook) return eachUser;
  });
  const issuedBooks = [];

  userIsIssuedBook.forEach((eachBook) => {
    const book = books.find((book) => book.id === eachBook.issuedBook);

    book.issuedBy = eachBook.name;
    book.issuedDate = eachBook.issuedDate;
    book.returnDate = eachBook.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no book is issued to user",
    });
  }
  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});
//router to post new pooks
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "no data is provided please provide data",
    });
  }
  const book = books.find((eachBook) => eachBook.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "book is already exist ",
    });
  }
  const allBooksData = [...books, data];
  return res.status(201).json({
    success: true,
    data: allBooksData,
  });
});

//router for updating data
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res
      .status(404)
      .json({ success: false, message: "book not exist with this id" });
  }
  const updatingBookData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: updatingBookData,
  });
});



module.exports = router;
