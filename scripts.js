const bookTable = document.getElementById("books-table");
const bookTableBody = document.querySelector("#books-table tbody");
const addBookBtn = document.querySelector(".add-book-btn");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const addBookForm = document.querySelector("#form");

// Array of Books
const myLibrary = [
    new Book("How To Save The World", "veles-rgb", 0, true),
    new Book("The Hobbit", "J. R. R. Tolkien", 310, false),
    new Book("The Alchemist", "Paulo Coelho", 163, true),
    new Book("The Da Vinci Code", "Dan Brown", 689, false),
];

// Constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

// Change the read status of a book
Book.prototype.changeStatus = function(index) {
    if (myLibrary[index].status === true) {
        myLibrary[index].status = false
    } else {
        myLibrary[index].status = true
    }
    // Update table display after status change
    updateTable();
}

// Add books to library
function addBookToLibrary(title, author, pages, status) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, pages, status))
};

// Add book to display table
function displayBook(book, index) {
    const newRow = document.createElement("tr");
    // Connect row with index
    newRow.setAttribute("data-index", index);
    bookTableBody.appendChild(newRow);

    const title = document.createElement("td");
    title.textContent = book.title;
    title.classList.add("book-title");
    newRow.appendChild(title);

    const author = document.createElement("td");
    author.textContent = book.author;
    author.classList.add("book-author");
    newRow.appendChild(author);

    const pages = document.createElement("td");
    pages.textContent = book.pages;
    pages.classList.add("book-pages");
    newRow.appendChild(pages);

    const status = document.createElement("td");
    newRow.appendChild(status);
    const statusBtn = document.createElement("button");
    statusBtn.textContent = book.status ? "Read" : "Not Read";
    statusBtn.classList.add("status-btn");
    // Event listener for status button
    statusBtn.addEventListener("click", () => book.changeStatus(index));
    status.appendChild(statusBtn);

    const delBtnCell = document.createElement("td");
    newRow.appendChild(delBtnCell);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Book";
    delBtn.classList.add("del-btn");
    delBtn.addEventListener("click", () => deleteBook(index));
    delBtnCell.appendChild(delBtn);
}

// Delete book from array and update display
function deleteBook(index) {
    myLibrary.splice(index, 1);
    updateTable();
}

// Display books already in array
function updateTable() {
    bookTableBody.innerHTML = "";
    myLibrary.forEach((book, index) => displayBook(book, index));
}

updateTable();

// Capture form data and add to library and display
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const status = formData.get("status") === "true";

    // Create new book from form data
    const newBook = new Book(title, author, pages, status);

    // Add new book to library and update display
    addBookToLibrary(title, author, pages, status);
    updateTable();

    dialog.close();
});

addBookBtn.addEventListener("click", () => {
    dialog.showModal()
});

closeButton.addEventListener("click", () => {
    dialog.close();
});