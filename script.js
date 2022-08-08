let myLibrary = [];
const bookshelf = document.querySelector(".bookshelf");
const newBook = document.querySelector(".new-book");
const addBookForm = document.querySelector(".add-book-form");
const addBook = document.querySelector(".add-book");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");

newBook.addEventListener("click", () => {
  addBookForm.hidden = !addBookForm.hidden;
});
addBook.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    formTitle.validity.valid &&
    formAuthor.validity.valid &&
    formPages.validity.valid &&
    formRead.validity.valid
  )
    addBookToLibrary(
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formRead.checked
    );
  displayBooks();
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "already read" : "not read yet"
    }`;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

// function Book(title, author, pages, read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.info = () => {
//         let infoStr = "";
//         infoStr += `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
//         return infoStr;
//     }
// }

// Book.prototype.toggleRead = function () {
//     this.read = !this.read;
// }

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("Hobbit", "JRR Tolkien", 250, true);
addBookToLibrary("Lord of the Rings", "JRR Tolkien", 800, false);
addBookToLibrary("Game of Thrones", "George RR Martin", 5000, true);

function displayBooks() {
  bookshelf.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.dataset.number = i;
    bookCard.textContent = myLibrary[i].info();

    let xBtn = document.createElement("button");
    xBtn.classList.add("xBtn");
    xBtn.textContent = "X";
    xBtn.dataset.number = i;
    xBtn.addEventListener("click", (e) => {
      myLibrary.splice(e.target.dataset.number, 1);
      displayBooks();
    });

    let toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Read book";
    toggleBtn.classList.add("toggleBtn");
    toggleBtn.dataset.number = i;
    toggleBtn.addEventListener("click", (e) => {
      console.log(e.target.dataset.number);
      myLibrary[e.target.dataset.number].toggleRead();
      displayBooks();
    });

    bookCard.appendChild(toggleBtn);
    bookCard.appendChild(xBtn);
    bookshelf.appendChild(bookCard);
  }
}

displayBooks();
