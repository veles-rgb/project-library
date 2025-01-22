const bookTable = document.getElementById("books-table")
const addBookBtn = document.querySelector(".add-book-btn")
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button");
const addBookForm = document.querySelector("#form")

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

myLibrary.forEach((book) => {
    const newRow = document.createElement("tr")
    bookTable.appendChild(newRow)

    const title = document.createElement("td")
    title.textContent = book.title
    title.classList.add("book-title")
    newRow.appendChild(title)

    const author = document.createElement("td")
    author.textContent = book.author
    author.classList.add("book-author")
    newRow.appendChild(author)

    const pages = document.createElement("td")
    pages.textContent = book.pages
    pages.classList.add("book-pages")
    newRow.appendChild(pages)

    const status = document.createElement("td")
    status.textContent = book.status
    status.classList.add("book-status")
    newRow.appendChild(status)
})

addBookBtn.addEventListener("click", () => {
    dialog.showModal()
})

closeButton.addEventListener("click", () => {
    dialog.close();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const title = formData.get("title") 
    const author = formData.get("author")
    const pages = formData.get("pages")
    const status = formData.get("status")

    addBookToLibrary(title, author, pages, status)
    dialog.close();
})

// Need to figure out how to display newly added books to the list with the for loop. Because currently they only add the the array but do not display.