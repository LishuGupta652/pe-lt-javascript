// Class Book 
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// Ui Class handels the UI Tasks 
class UI {
    static displayBooks(){
        
        // Dummy DATA    
        // const storedBooks = [
        //     {
        //         title: "myBook",
        //         author: "john Doe",
        //         isbn: '582342'
        //     },
        //     {
        //         title: "second Book",
        //         author: "Rad Helinton",
        //         isbn: '345298'
        //     }
        // ];

        const books = Store.getBooks();
        
        books.forEach((book) => UI.addBooksToList(book));

    }

    static addBooksToList(book){
        const list  = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn  btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message , className){
        const div = document.createElement('div');

        div.classList= `alert alert-${className}`
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        // Make alert Disappare
        setTimeout( () => document.querySelector('.alert').remove(), 3000)
    }
    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}


// store Class
class Store{
    static getBooks(){
        let books;
        
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(book){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event : Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === "" || author === '' || isbn === ''){
        UI.showAlert('Please Fill in all Fields', 'danger');
    }else{
        // Instantiate Book
        const book = new Book(title , author, isbn);

        // addBook to UI
        UI.addBooksToList(book);

        // Add book to Storage
        Store.addBook(book);

        // Show success Message 
        UI.showAlert("Book Added", "success");


        UI.clearFields();
    }

}); 

// Event : Reomve Book
document.querySelector('#book-list').addEventListener('click', (e) =>
{
    UI.deleteBook(e.target);

    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
    // Show success Message 
    UI.showAlert("Book Removed", "success");
})