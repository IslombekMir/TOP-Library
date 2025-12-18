const myLibrary = [];


class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let temporary = new Book(title, author, pages, read);
    myLibrary.push(temporary)
}

addBookToLibrary("1984", "George Orwell", 200, true);
addBookToLibrary("The Dark Night", "Cristopher Nolan", 2003, false);
addBookToLibrary("Infinity War", "The Russo Brothers", 2018, false);

const table = document.querySelector("table");
const submitBtn = document.querySelector("#submit");
const closeDialogBtn = document.getElementById("close-dialog");
const newBookBtn = document.querySelector(".new-book-btn");
const form = document.querySelector("form");
const dialog = document.querySelector(".form-wrapper");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");


function displayBooks() {
    table.innerHTML = "";
    let tableHeadings = document.createElement("tr");
    tableHeadings.innerHTML = "<th>Id</th><th>Title</th><th>Author</th><th>Pages</th><th>Read</th><th>Edit</th>";
    table.appendChild(tableHeadings);
    

    for(let idx in myLibrary) {
        let book = myLibrary[idx]
        let tr = document.createElement("tr")
        for (let key in book) {
            let detail = book[key];
            let td = document.createElement("td");
            td.innerHTML = detail == true ? "Read" : detail == false ? "Not Read" : detail;
            tr.appendChild(td);
        }

        let toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Read or Not";
        toggleReadBtn.setAttribute("data-book-id", book.id)
        toggleReadBtn.classList.add("toggle-read");

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete"
        deleteBtn.setAttribute("data-book-id", book.id)
        deleteBtn.classList.add("delete-btn");
        
        tr.appendChild(deleteBtn);
        tr.appendChild(toggleReadBtn);
        table.appendChild(tr)
    }
}


newBookBtn.addEventListener("click", (e) => {
    dialog.showModal();
})


closeDialogBtn.addEventListener("click", (e) => {
    dialog.close();
    form.reset();
})


form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = false;

    closeDialogBtn.click();
    addBookToLibrary(title, author, pages, read);
    displayBooks();
})

table.addEventListener("click", e => {
    if(e.target.classList.contains("delete-btn")) {
        const bookId = e.target.dataset.bookId;
        const idx = myLibrary.findIndex(book => book.id === bookId);
        if(idx !== -1) {
            myLibrary.splice(idx, 1);
            displayBooks();
        }
    }
    else if(e.target.classList.contains("toggle-read")) {
        const bookId = e.target.dataset.bookId;
        const idx = myLibrary.findIndex(book => book.id === bookId);
        myLibrary[idx].read = !myLibrary[idx].read;
        displayBooks();
    }
})



//Form Validation
title.addEventListener("input", (e) => {
    title.setCustomValidity("");
    if (title.validity.tooShort) {
        title.setCustomValidity(`The title needs to be at least 10 characters. You have ${title.value.length} characters.`);
    } else if (title.validity.tooLong) {
        title.setCustomValidity("Title is too long.");
    } else {
        title.setCustomValidity("");
    }
})

title.addEventListener("invalid", () => {
    if (title.validity.valueMissing) {
        title.setCustomValidity("Title cannot be empty.");
    }
})

author.addEventListener("input", (e) => {
    author.setCustomValidity("");

    if (author.validity.tooShort) {
        author.setCustomValidity(`The author name needs to be at least 10 characters. You have ${author.value.length} characters.`);
    } else if (author.validity.tooLong) {
        author.setCustomValidity("Author name is too long.");
    } else {
        author.setCustomValidity("");
    }
})

author.addEventListener("invalid", (e) => {
    if (author.validity.valueMissing) {
        author.setCustomValidity("Author name cannot be empty.");
    }
})

pages.addEventListener("input", (e) => {
    pages.setCustomValidity("");
    if (pages.validity.rangeUnderflow) {
        pages.setCustomValidity("There needs to be at least 50 pages.");
    } else if (pages.validity.rangeOverflow) {
        pages.setCustomValidity("There needs to be under 2000 pages.");
    } else {
        pages.setCustomValidity("");
    }
})

pages.addEventListener("invalid", () => {
    if(pages.validity.valueMissing) {
        pages.setCustomValidity("Pages cannot be empty.");
    }
})


displayBooks();