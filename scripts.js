let myLibrary = []
let id = 0;
/*BOOK CONTAINER**************************************************/
let bookContainer = document.querySelector('.book-container');

function toggleFavoriteBook(e){
  let favoriteDiv = e.currentTarget;
  let fIcon = favoriteDiv.querySelector("i");

  let bookId = favoriteDiv.dataset.book;
  let book =  myLibrary.map(item => item.id).indexOf(Number(bookId));

  //toggle favorite book function in the Book object
  myLibrary[book].toggleFavorite();

  //changes icon type and toggles 'favorite' class in the favoriteDiv
  if(favoriteDiv.classList.contains('favorite')){
    favoriteDiv.classList.remove('favorite');
    fIcon.classList.remove("fa-solid");
    fIcon.classList.add("fa-regular");
  }
  else{
    favoriteDiv.classList.add('favorite');
    fIcon.classList.remove("fa-regular");
    fIcon.classList.add("fa-solid");
  }
}

function toggleReadBook(e){
  let readBtn = e.currentTarget;
  let bookId = readBtn.value;
  let book =  myLibrary.map(item => item.id).indexOf(Number(bookId));
  //toggle read book function in the Book object
  myLibrary[book].toggleRead();


  //toggles 'read' class on btn and changes text depending on state
  if (readBtn.classList.contains("read")){
    readBtn.classList.remove("read");
    readBtn.innerText = "Unread";
  }
  else{
    readBtn.classList.add("read");
    readBtn.innerText = "Read";
  }
}

function deleteBook(e){
  let uId = e.currentTarget.dataset.book;

  //removes from data library
  myLibrary = myLibrary.filter(book => book.id != uId);

  //removes from DOM
  document.getElementById(uId).remove();
}
function createBook(book){
  const bookDiv = document.createElement('div');
  bookDiv.id = String(id);
  id++;
  bookDiv.classList.add("book");
  

  /////DELETE BUTTON/////
  //create delete area
  const bookDel = document.createElement('span');
  bookDel.classList.add("book_delete");
  bookDel.setAttribute('data-book', Number(bookDiv.id));

  //create delete icon
  const bookDelIcon = document.createElement('i');
  bookDelIcon.classList.add("account-icon");
  bookDelIcon.classList.add("fa-solid");
  bookDelIcon.classList.add("fa-trash-can");

  bookDel.addEventListener('click', deleteBook);

  //appends book icon to favorite div
  bookDel.appendChild(bookDelIcon);
  //appends favorite div to book div
  bookDiv.appendChild(bookDel);

  /////FAVORITE BUTTON/////
  //create favorites areas
  const bookFav = document.createElement('span');
  bookFav.classList.add("book_favorite");
  if (book.isFavorite){
    bookFav.classList.add("favorite");
    
  }
  bookFav.setAttribute('data-book', Number(bookDiv.id));

  //create favorites icon
  const bookFavIcon = document.createElement('i');
  bookFavIcon.classList.add("account-icon");
  console.log(book.isFavorite);
  if (book.isFavorite){
    bookFavIcon.classList.add("fa-solid");
    
  }
  else{
    bookFavIcon.classList.add("fa-regular");
  }
  bookFavIcon.classList.add("fa-heart");

  bookFav.addEventListener('click', toggleFavoriteBook);

  //appends book icon to favorite div
  bookFav.appendChild(bookFavIcon);
  //appends favorite div to book div
  bookDiv.appendChild(bookFav);

  //create book cover
  const bookCover = document.createElement("div");
  bookCover.classList.add('book_cover');

  //create title p
  const bookTitle = document.createElement("p");
  bookTitle.classList.add("book_title");
  bookTitle.innerText = book.title;
  bookCover.appendChild(bookTitle);

  //create author p
  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book_author");
  bookAuthor.innerText = book.authorFirstName + " " + book.authorLastName;
  bookCover.appendChild(bookAuthor);

  //appends book cover to book div
  bookDiv.appendChild(bookCover);

  //BOOK INFO
  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book_info");

  //create p for book pages
  const bookPages = document.createElement("p");
  bookPages.classList.add("book_pages");
  bookPages.innerText = book.pageCount + " pgs.";
  bookInfo.appendChild(bookPages);

  //create button for read
  const bookReadBtn = document.createElement("button");
  bookReadBtn.value = bookDiv.id;
  bookReadBtn.classList.add("book_read");
  if (book.hasRead){
    bookReadBtn.classList.add("read");
    bookReadBtn.innerText = "Read";
  }
  else{
    bookReadBtn.innerText = "Unread";
  }

  bookReadBtn.addEventListener('click', toggleReadBook);
  bookInfo.appendChild(bookReadBtn);

  //apends book info to book div
  bookDiv.appendChild(bookInfo);

  //appends book div to book container
  bookContainer.appendChild(bookDiv);
}

/*OBJECTS**********************************************/
function Book(title, firstName, lastName, pages, read, favorite){
  this.id = id;
  this.title = title
  this.authorFirstName = firstName
  this.authorLastName = lastName
  this.pageCount = pages
  this.hasRead = read
  this.isFavorite = favorite
}

Book.prototype.displayInfo = function() {
  console.log(`${this.title} by ${this.authorFirstName} ${this.authorLastName} is ${this.pageCount} pages long. `);
  
  if (this.isFavorite){
    console.log("I have read it.");
  }
  if (this.hasRead){
    console.log("It is one of my favorite books.")
  }
}

Book.prototype.addBookToLibrary = function(){
  //adds to the data
  myLibrary.push(this);
  createBook(this);
}

Book.prototype.removeBookFromLibrary = function(){
  //adds to the data
  myLibrary.push(this);
}

Book.prototype.toggleRead = function(){
  if (this.hasRead){
    this.hasRead = false;
  }
  else{
    this.hasRead = true;
  }
  console.log(this);
}

Book.prototype.toggleFavorite = function(){
  //toggles favorite
  if (this.isFavorite){
    this.isFavorite = false;
  }
  else{
    this.isFavorite = true;
  }
}


//////////////////////////////////////////////////////////

/*BUTTONS***********************************************/
function addBook(){
    addModal.style.display = "block";
}
function toggleView(){
    console.log("Toggle View.");
}
function exportBooks(){
    console.log("Export.");
}
function signInUser(){
    console.log("Login.")
}
//grabs buttons
const loginBtn = document.querySelector('#login-btn');
const addBtn = document.querySelector('#add-btn');
const toggleBtn = document.querySelector('#toggle-btn');
const exportBtn = document.querySelector('#export-btn');

loginBtn.addEventListener('click',signInUser);
addBtn.addEventListener('click', addBook);
toggleBtn.addEventListener('click', toggleView);
exportBtn.addEventListener('click',exportBooks);
/////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////

/*MODAL**************************************************/
//grabs modal for new book
const addModal = document.getElementById("bookModal");

const bookInputs = addModal.querySelectorAll('input');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    addModal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == addModal) {
      addModal.style.display = "none";
    }
  }

function callbackFunction(event){

  //prevents form from submitting anywhere
  event.preventDefault();

  const myFormData = new FormData(event.target);
  
  const bookData = {
    "markfavorite": false,
    "markread": false
  };

//clears all values from the modal
function clearBookModal(){
  bookInputs[0].value = ""
  bookInputs[1].value = ""
  bookInputs[2].value = ""
  bookInputs[3].value = ""
  bookInputs[4].checked = false
  bookInputs[5].checked = false
}




  //converts the form data into 
  myFormData.forEach((value, key) => (bookData[key] = value));
  
  //corrects to true if a user checks the boxes
  if (bookData.markread != false){
    bookData.markread = true
  }
  if (bookData.markfavorite != false){
    bookData.markfavorite = true
  }

  //creates book object
  const newBook = new Book(bookData.title, bookData.fname, bookData.lname, bookData.pagecount, bookData.markread, bookData.markfavorite);

  //adds book to library data
  newBook.addBookToLibrary();

  //"closes" modal
  addModal.style.display = "none";

  //resets modal
  clearBookModal();


}
// Get the submit button from the Addition modal
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit',callbackFunction);
