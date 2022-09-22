
const sidebar = document.getElementById("sidebar")
const main = document.getElementById("main")
const addBookButton = document.getElementById("addBookButton")
const close = document.getElementById("close")
const grid = document.getElementById("grid")

const form = document.getElementById("form")
const title = document.getElementById("title")
const author = document.getElementById("author")
const pages = document.getElementById("pages")
const checkbox = document.getElementById("checkbox")


let myLibrary = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

const addBookToLibrary = (title, author, pages, read) => {
    const book = new Book(title, author, pages, read)

    myLibrary.push(book)
}

const addToPage = (title, author, pages, read) => {
    const grid = document.getElementById("grid")

    
    const card = document.createElement("div")
    const text = document.createElement("div")
    const titleToAdd = document.createElement("p")
    const authorToAdd = document.createElement("p")
    const pagesToAdd = document.createElement("p")
    const icons = document.createElement("div")
    const checkbox = document.createElement("input")
    const deleteButton = document.createElement("span")

   
    card.classList.add("card")
    text.classList.add("text")
    icons.classList.add("icons")
    checkbox.setAttribute("type", "checkbox")
    deleteButton.classList.add("material-symbols-outlined")

    titleToAdd.textContent = title
    authorToAdd.textContent = author
    pagesToAdd.textContent = `${pages} pages`
    deleteButton.textContent = "delete"
    checkbox.checked = read
   
    grid.append(card)
    card.append(text)
    text.append(titleToAdd)
    text.append(authorToAdd)
    text.append(pagesToAdd)
    card.append(icons)
    icons.append(checkbox)
    icons.append(deleteButton)
}

const clearSidebar = () => {
    sidebar.style.width = "0"
    sidebar.style.padding = "0"
    main.style.transition = "0"
    main.style.filter = "blur(0)"
}

const openSidebar = () => {
    sidebar.style.width = "400px"
    sidebar.style.padding = "1rem"
    main.style.transition = "1s"
    main.style.filter = "blur(5px)"
}


const clearAll = () => {
    const grid = document.getElementById("grid")

    while (grid.firstChild) grid.removeChild(grid.firstChild)
}

const displayAll = library => { library.forEach(book => addToPage(book.title, book.author, book.pages, book.read)) }

addBookToLibrary("1984", "George Orwell", "2", false)
addBookToLibrary("Moby-Dick", "Herman Melville", "5", true)
addBookToLibrary("The Call of the Wild ", "Jack London", "7", true)
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", "10", true)
addBookToLibrary("Don Quixote", "Miguel de Cervantes", "11", false)
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "8", true)

displayAll(myLibrary)

form.addEventListener("submit", () => {
    addBookToLibrary(title.value, author.value, pages.value, read.checked)
    addToPage(title.value, author.value, pages.value, read.checked)

    clearSidebar()

    title.value = ""
    author.value = ""
    pages.value = ""
    read.checked = false

})

grid.addEventListener("click", e => {

    const target = e.target
    const itemGrandparent = target.parentElement.parentElement
    const cardTitle = itemGrandparent.firstElementChild.firstElementChild.textContent

    if (target.type === 'checkbox') {
       
        myLibrary.forEach(book => {
            if (book.title === cardTitle) {
                if (target.checked === true) {
                    book.read = true
                } else book.read = false
            }
        })
    } else if (target.className === 'material-symbols-outlined') {
       
        myLibrary.forEach(book => {
            if (book.title === cardTitle) {
                myLibrary = myLibrary.filter(item => item.title != book.title)
            }
        })

        grid.removeChild(itemGrandparent)
    }
})

addBookButton.addEventListener('click', openSidebar)
close.addEventListener('click', clearSidebar)





