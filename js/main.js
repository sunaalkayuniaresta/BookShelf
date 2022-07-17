document.addEventListener("DOMContentLoaded", function () {
  const btnAddingForm = document.getElementById("form");
  const btnSearching = document.getElementById("btn-search");

  btnAddingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addingBook();
  });

  btnSearching.addEventListener("click", function (event) {
    event.preventDefault();
    if (localStorage.getItem(KEY) == "") {
      alert("Data buku tidak ditemukan");
      return location.reload;
    } else {
      search();
    }
  });

  if (isExist()) {
    localData();
  }
});

document.addEventListener("datasaved", () => {
  alert("Data buku berhasil di update");
});

document.addEventListener("dataloaded", () => {
  reloadData();
});
