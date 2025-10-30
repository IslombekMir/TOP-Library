const myLibrary = [];

// function Book(title, author, pages, read) {
    
    
//     if(!new.target) {
//         throw Error("Please use the new keyword!")
//     }

//     this.id = crypto.randomUUID()
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }


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


const newBookBtn = document.querySelector(".new-book-btn");
const form = document.querySelector("form");
const dialog = document.querySelector(".form-wrapper");

newBookBtn.addEventListener("click", (e) => {
    dialog.showModal();
})


const submitBtn = document.querySelector("#submit");
const closeDialogBtn = document.getElementById("close-dialog");

closeDialogBtn.addEventListener("click", (e) => {
    dialog.close();
})


submitBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = false;
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







displayBooks();