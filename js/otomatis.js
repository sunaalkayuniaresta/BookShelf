const UNCOMPLETED_LISTED_BOOKS_ID = "uncompleted";
const COMPLETED_LISTED_BOOKS_ID = "completed";
const ID_ITEM = "bookid";

function createBook(title, author, year, isCompleted) {
  const titleBook = document.createElement("h2");
  titleBook.innerText = title;

  const authorBook = document.createElement("p");
  authorBook.classList.add("author");
  authorBook.innerText = author;

  const yearOfBook = document.createElement("p");
  yearOfBook.classList.add("year");
  yearOfBook.innerText = year;

  const displayContent = document.createElement("div");
  displayContent.classList.add("show");
  displayContent.append(titleBook, authorBook, yearOfBook);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(displayContent);

  if (isCompleted) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton(), createTrashButton());
  }
  return container;
}

function addingBook() {
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearOfBook = document.getElementById("year").value;
  const bookComplete = document.getElementById("inputBookIsComplete").checked;

  const book = createBook(titleBook, authorBook, yearOfBook, bookComplete);
  const bookObject = BooksObject(titleBook, authorBook, yearOfBook, bookComplete);

  book[ID_ITEM] = bookObject.id;
  books.push(bookObject);

  if (bookComplete) {
    const Completed_Reading_List = document.getElementById(COMPLETED_LISTED_BOOKS_ID);
    Completed_Reading_List.append(book);
  } else {
    const unCompleted_Reading_List = document.getElementById(UNCOMPLETED_LISTED_BOOKS_ID);
    unCompleted_Reading_List.append(book);
  }
  updateData();
}

function addTaskToCompleted(taskElement) {
  const completedListed = document.getElementById(COMPLETED_LISTED_BOOKS_ID);
  const titleBook = taskElement.querySelector(".show > h2").innerText;
  const authorBook = taskElement.querySelector(".show > .author").innerText;
  const yearOfBook = taskElement.querySelector(".show > .year").innerText;

  const newBook = createBook(titleBook, authorBook, yearOfBook, true);
  const book = findBookData(taskElement[ID_ITEM]);
  book.isCompleted = true;
  newBook[ID_ITEM] = book.id;

  completedListed.append(newBook);
  taskElement.remove();

  updateData();
}

function removeTaskFromCompleted(taskElement) {
  const bookLocation = findBookIndex(taskElement[ID_ITEM]);
  books.splice(bookLocation, 1);

  taskElement.remove();
  alert("Data Buku Berhasil di hapus");
  updateData();
}

function undoTaskFromCompleted(taskElement) {
  const listedUncompleted = document.getElementById(UNCOMPLETED_LISTED_BOOKS_ID);
  const titleBook = taskElement.querySelector(".show > h2").innerText;
  const authorBook = taskElement.querySelector(".show > .author").innerText;
  const yearOfBook = taskElement.querySelector(".show > .year").innerText;

  const newBook = createBook(titleBook, authorBook, yearOfBook, false);

  const book = findBookData(taskElement[ID_ITEM]);
  book.isCompleted = false;
  newBook[ID_ITEM] = book.id;

  listedUncompleted.append(newBook);
  taskElement.remove();

  updateData();
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}
