const createError = require("http-errors");
//the book list
let bookList = [];
let idNum = 0;

//returns all the bookList
exports.index = function (req, res) {
  res.send(bookList);
};

//returns single bookItem from id
exports.showId = function (req, res, next) {
  const bookItem = bookList.find((book) => book.id == req.params.id);
  if (!bookItem) {
    //next(createError) forces the program to continue even with an error otherwise it will crash
    return next(createError(404, "no book with that id"));
  }
  res.send(bookItem);
};

exports.showTitle = function (req, res, next) {
  const bookItem = bookList.find((book) => book.title == req.params.title);
  if (!bookItem) {
    //next(createError) forces the program to continue even with an error otherwise it will crash
    return next(createError(404, "no book with that title"));
  }
  res.send(bookItem);
};
//book by isbn
exports.showISBN = function (req, res, next) {
  const bookItem = bookList.find((book) => book.isbn == req.params.isbn);
  if (!bookItem) {
    //next(createError) forces the program to continue even with an error otherwise it will crash
    return next(createError(404, "no book in the list with that ISBN"));
  }
  res.send(bookItem);
};

exports.showAuthor = function (req, res, next) {
  const books = bookList.filter((book) => book.author == req.params.author);
  if (!books) {
    return next(createError(404, "no books by that author are in the list"));
  }
  res.send(books);
};

exports.showGenre = function (req, res, next) {
  const books = bookList.filter((book) => book.genre == req.params.genre);
  if (!books) {
    return next(createError(404, "no books of that genre are in the list"));
  }
  res.send(books);
};

exports.showReadStatus = function (req, res, next) {
  if (req.params.read == "false") {
    const books = bookList.filter((book) => book.read == false);
    if (!books.length) {
      return next(createError(404, `you have no unread books on the list`));
    } else {
      res.send(books);
    }
  } else if (req.params.read == "true") {
    const books = bookList.filter((book) => book.read == true);
    if (!books.length) {
      return next(createError(404, `you have no read books on the list`));
    } else {
      res.send(books);
    }
  } else {
    return next(
      createError(400, `${req.params.read} is an invalid read status`)
    );
  }
};

exports.create = function (req, res, next) {
  //title required
  if (!req.body.title) {
    return next(createError(400, "title is required"));
  } else if (!req.body.author) {
    return next(createError(400, "author is required"));
  } else if (!req.body.isbn) {
    return next(createError(400, "ISBN is required"));
  } else if (
    bookList == bookList.filter((book) => book.isbn != req.params.isbn)
  ) {
    return createError(400, "This book is already in the list");
  }
  bookList.push({
    id: idNum,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    blurb: req.body.blurb,
    isbn: req.body.isbn,
    read: req.body.read,
  });
  //increments the id number per create
  idNum++;
  res.send({ result: true });
};

exports.delete = function (req, res, next) {
  //does the item exist
  const bookItem = bookList.find((book) => book.id == req.params.id);
  if (!bookItem) {
    //error if it doesnt
    return next(createError(404, "no book with that id"));
  }
  //sets item to everthing but the item with id
  bookList = bookList.filter((book) => book.id != req.params.id);
  res.send({ result: true });
};

exports.update = function (req, res, next) {
  const bookItem = bookList.find((book) => book.id == req.params.id);
  if (!bookItem) {
    return next(createError(404, "no book with that id"));
  }
  //loops round updating the list item
  bookList = bookList.map((book) => {
    if (book.id == req.params.id) {
      book.title = req.body.title;
      (book.author = req.body.author),
        (book.genre = req.body.genre),
        (book.blurb = req.body.blurb);
      (book.isbn = req.body.isbn), (book.read = req.body.read);
    }
    return book;
  });
  res.send({ result: true });
};
