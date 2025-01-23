const bookTable = document.getElementById("books-table");
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

// constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

// Add books to library
function addBookToLibrary(title, author, pages, status) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, pages, status))
};

// Add book to display table
function displayBook(book) {
    const newRow = document.createElement("tr");
    bookTable.appendChild(newRow);

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
    status.textContent = book.status;
    status.classList.add("book-status");
    newRow.appendChild(status);

    const delBtnCell = document.createElement("td")
    newRow.appendChild(delBtnCell)
    const delBtn = document.createElement("button")
    delBtn.textContent = "Delete Book"
    delBtn.parentElement = newRow
    delBtn.classList.add("del-btn")
    delBtnCell.appendChild(delBtn)

    // Add eventlistener to new button
    delBtnEventListener(delBtn)
}

// Display books already in array
myLibrary.forEach(displayBook);

// Capture form data and add to library and display
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const title = formData.get("title") 
    const author = formData.get("author")
    const pages = formData.get("pages")
    const status = formData.get("status")

    // Create new book from form Data
    const newBook = new Book(title, author, pages, status);

    // Add new book to library and display on table
    addBookToLibrary(title, author, pages, status)
    displayBook(newBook);
    
    dialog.close();
});

// Create event listener on button
function delBtnEventListener(btn) {
    btn.addEventListener("click", (e) => {
        const btn = e.target;
        btn.parentElement.parentElement.remove()
    });
}

addBookBtn.addEventListener("click", () => {
    dialog.showModal()
});

closeButton.addEventListener("click", () => {
    dialog.close();
});