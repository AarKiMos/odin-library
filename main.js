const myLibrary = [];

function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;

  this.info = function () {
    return `${title} by ${author}, ${pageCount}, ${
      isRead ? "have read" : "not read yet"
    }.`;
  };
}

function addBookToLibrary({ title, author, pageCount, isRead }) {
  const newBook = new Book(title, author, pageCount, Boolean(+isRead));
  myLibrary.push(newBook);
}

const dialog = document.querySelector(".add-book-dialog");
const showButton = document.querySelector(".new-book-btn");
const closeButton = document.querySelector("#submit-btn");
const bookForm = document.querySelector("#new-book-form");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
  const formData = new FormData(event.target);
  let data = formData.entries().reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  console.log(data);
  addBookToLibrary(data);

  // refreshBookDOM();
  bookForm.reset();
});
