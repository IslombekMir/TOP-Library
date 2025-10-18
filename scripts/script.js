const myLibrary = [];

function Book(title, author, pages) {
    if(!new.target) {
        throw Error("Please use the new keyword!")
    }

    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    let temporary = new Book(title, author, pages)
    myLibrary.push(temporary)
}

addBookToLibrary("1984", "George Orwell", 200)
addBookToLibrary("The Dark Night", "Cristopher Nolan", 2003)
addBookToLibrary("Infinity War", "The Russo Brothers", 2018)

const table = document.querySelector("table");

function displayBooks() {
    table.innerHTML = "";
    let tableHeadings = document.createElement("tr");
    tableHeadings.innerHTML = "<th>Id</th><th>Title</th><th>Author</th><th>Pages</th><th>Delete</th>"
    table.appendChild(tableHeadings);
    

    for(let idx in myLibrary) {
        let book = myLibrary[idx]
        let tr = document.createElement("tr")
        for (let key in book) {
            let detail = book[key];
            let td = document.createElement("td");
            td.innerHTML = detail;
            tr.appendChild(td);

           
        }
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete"
        deleteBtn.setAttribute("data-book-id", book.id)
        deleteBtn.classList.add("delete-btn");
        tr.appendChild(deleteBtn)
        table.appendChild(tr)
    }
}


const newBookBtn = document.querySelector("button");
const form = document.querySelector("form")

newBookBtn.addEventListener("click", (e) => {
    form.classList.add("visible")
})


const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    addBookToLibrary(title, author, pages);
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
})




displayBooks();