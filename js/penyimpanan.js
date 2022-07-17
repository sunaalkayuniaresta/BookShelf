const KEY = "BOOKS_APPS";

let books = [];

function isExist() {
  if (typeof Storage === undefined) {
    alert("Browser anda belum mendukung local storage");
    return false;
  }
  return true;
}

function localData() {
  const listData = localStorage.getItem(KEY);

  let data = JSON.parse(listData);

  if (data != null) books = data;

  document.dispatchEvent(new Event("dataloaded"));
}

function BooksObject(title, author, year, isCompleted) {
  return {
    id: new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function saveData() {
  const data = JSON.stringify(books);
  localStorage.setItem(KEY, data);
  document.dispatchEvent(new Event("datasaved"));
}

function updateData() {
  if (isExist()) {
    saveData();
  }
}

function findBookData(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }

  return -1;
}

function reloadData() {
  const listedUncompleted = document.getElementById(UNCOMPLETED_LISTED_BOOKS_ID);
  const completedListed = document.getElementById(COMPLETED_LISTED_BOOKS_ID);

  for (book of books) {
    const newBook = createBook(book.title, book.author, book.year, book.isCompleted);
    newBook[ID_ITEM] = book.id;

    if (book.isCompleted) {
      completedListed.append(newBook);
    } else {
      listedUncompleted.append(newBook);
    }
  }
}

function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
