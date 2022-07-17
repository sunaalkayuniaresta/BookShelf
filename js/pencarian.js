function search() {
  const dataSearch = document.getElementById("search-input");
  const gettingTitle = getData().filter((book) => book.title === dataSearch.value);
  const gettingAuthor = getData().filter((book) => book.author === dataSearch.value);
  const gettingYear = getData().filter((book) => book.year === dataSearch.value);

  if (gettingTitle.length == 0) {
    if (gettingAuthor.length == 0) {
      if (gettingYear.length == 0) {
        alert("Data buku tidak ditemukan");
      } else {
        showResult(gettingYear);
      }
    } else {
      showResult(gettingAuthor);
    }
  } else {
    showResult(gettingTitle);
  }
}

function showResult(books) {
  const searchingList = document.getElementById("search-result");
  searchingList.innerHTML = "";

  alert("Data buku ditemukan");
  const descResult = document.createElement("h2");
  descResult.classList.add("text-result");
  descResult.innerText = "Jumlah ditemukan : " + books.length;

  searchingList.append(descResult);

  for (book of books) {
    const titleBook = document.createElement("h2");
    titleBook.innerText = book.title;

    const authorBook = document.createElement("p");
    authorBook.classList.add("author");
    authorBook.innerText = book.author;

    const yearOfBook = document.createElement("p");
    yearOfBook.classList.add("year");
    yearOfBook.innerText = book.year;

    const bookStatus = document.createElement("p");
    if (book.isCompleted) {
      bookStatus.classList.add("text-complete");
      bookStatus.innerText = "Status : Selesai Dibaca";
    } else {
      bookStatus.classList.add("text-uncomplete");
      bookStatus.innerText = "Status : Belum Selesai Dibaca";
    }

    const displayContent = document.createElement("div");
    displayContent.classList.add("show");
    displayContent.append(titleBook, authorBook, yearOfBook, bookStatus);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(displayContent);

    searchingList.append(container);
  }
}
