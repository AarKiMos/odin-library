const myLibrary = [
  {
    title: "book title 1",
    author: "book author 1",
    pageCount: "56",
    isRead: true,
  },
  {
    title: "book title 2",
    author: "book author 2",
    pageCount: "567",
    isRead: false,
  },
  {
    title: "book title 3",
    author: "book author 1",
    pageCount: "58",
    isRead: true,
  },
];

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

  refreshBookDOM();
  bookForm.reset();
});

function refreshBookDOM() {
  const tableBody = document.querySelector("#book-table-body");
  tableBody.innerHTML = "";

  let idx = 1;
  myLibrary.forEach((book) => {
    const newRow = document.createElement("tr");
    newRow.setAttribute("id", `b${idx}`);
    newRow.innerHTML = `
    <td>${idx}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pageCount}</td>
    <td><input type="checkbox" ${
      book.isRead ? "checked" : ""
    } class="is-read-cb" data-bid="${idx - 1}" /></td>
    <td><button>DELETE</button></td>
  `;

    idx++;

    const bookNode = tableBody.appendChild(newRow);
    const readCheckbox = bookNode.querySelector(".is-read-cb");

    readCheckbox.addEventListener("change", (event) => {
      const bid = event.target.dataset.bid;
      myLibrary[bid].isRead = !myLibrary[bid].isRead;
      // console.table(myLibrary)
    });
  });
}

function handleReadToggle(e) {
  console.log(e);
}

refreshBookDOM();
