let myLibrary = []
let id = 0;
/*BOOK CONTAINER**************************************************/
let bookContainer = document.querySelector('.book-container');

function toggleFavoriteBook(e){
  //sets div
  let favoriteDiv = e.currentTarget;
  //grabs icon
  let fIcon = favoriteDiv.querySelector("i");

  //grabs book id based off of div's data-book
  let bookId = favoriteDiv.dataset.book;
  //grabs the index of the book in the library based off its ID 
  let book =  myLibrary.map(item => item.id).indexOf(Number(bookId));

  //toggle favorite book function in the Book object usings its ID
  myLibrary[book].toggleFavorite();

  //changes icon type and toggles 'favorite' class in the favoriteDiv
  if(favoriteDiv.classList.contains('favorite')){
    //enters if it's currently set as a favorite
    favoriteDiv.classList.remove('favorite');
    fIcon.classList.remove("fa-solid");
    fIcon.classList.add("fa-regular");
  }
  else{
    //enters if it's not currently set as a favorite
    favoriteDiv.classList.add('favorite');
    fIcon.classList.remove("fa-regular");
    fIcon.classList.add("fa-solid");
  }
}

function toggleReadBook(e){
  //grabs button
  let readBtn = e.currentTarget;
  //grabs value of button (the book ID)
  let bookId = readBtn.value;
  //looks for the book's id in the array and return its index
  let book =  myLibrary.map(item => item.id).indexOf(Number(bookId));
  //toggle read book function in the Book object
  myLibrary[book].toggleRead();


  //toggles 'read' class on btn and changes text depending on state
  if (readBtn.classList.contains("read")){
    //enters if it's currently set read
    readBtn.classList.remove("read");
    readBtn.innerText = "Unread";
  }
  else{
    //enters if it isn't currently set read
    readBtn.classList.add("read");
    readBtn.innerText = "Read";
  }
}

function deleteBook(e){
  //grabs id of the book
  let uId = e.currentTarget.dataset.book;

  //filters to only include the book id
  myLibrary = myLibrary.filter(book => book.id != uId);

  //removes from DOM
  document.getElementById(uId).remove();
}
function createBook(book){
  //creates <div> for the the book
  const bookDiv = document.createElement('div');
  bookDiv.classList.add("book");

  //sets id
  bookDiv.id = String(id);
  //increases the counter
  id++;


  /////DELETE BUTTON/////
  //creates <span> for the delete area
  const bookDel = document.createElement('span');
  bookDel.classList.add("book_delete");
  bookDel.setAttribute('data-book', Number(bookDiv.id));

  //creates <i> for the delete icon
  const bookDelIcon = document.createElement('i');
  bookDelIcon.classList.add("account-icon");
  bookDelIcon.classList.add("fa-solid");
  bookDelIcon.classList.add("fa-trash-can");
  //appends book icon to favorite div
  bookDel.appendChild(bookDelIcon);

  //creates click event for the delete area
  bookDel.addEventListener('click', deleteBook);

  //appends favorite div to book div
  bookDiv.appendChild(bookDel);


  /////FAVORITE BUTTON/////
  //creates <span> for the favorites area
  const bookFav = document.createElement('span');
  bookFav.classList.add("book_favorite");
  bookFav.setAttribute('data-book', Number(bookDiv.id));

  //adds the favorite class if it's chosen on submission
  if (book.isFavorite){
    bookFav.classList.add("favorite");
    
  }

  //create <icon> for favorites icon
  const bookFavIcon = document.createElement('i');
  bookFavIcon.classList.add("account-icon");
  bookFavIcon.classList.add("fa-heart");

  //adds the correct font-awesome icon type depending on whether it's chosen as a favorite on submission
  if (book.isFavorite){
    //enters if it's a favorite
    bookFavIcon.classList.add("fa-solid");
    
  }
  else{
    //enters if it's not a favorite
    bookFavIcon.classList.add("fa-regular");
  }
  
  //adds the click event to the favorite area
  bookFav.addEventListener('click', toggleFavoriteBook);

  //appends book icon to favorite div
  bookFav.appendChild(bookFavIcon);
  //appends favorite div to book div
  bookDiv.appendChild(bookFav);

  //BOOK COVER////////////////
  //creates <div> for book cover
  const bookCover = document.createElement("div");
  bookCover.classList.add('book_cover');

  //creates <p> for title
  const bookTitle = document.createElement("p");
  bookTitle.classList.add("book_title");
  bookTitle.innerText = book.title;
  bookCover.appendChild(bookTitle);

  //creates <p> for author
  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book_author");
  bookAuthor.innerText = book.authorFirstName + " " + book.authorLastName;
  bookCover.appendChild(bookAuthor);

  //appends book cover to book div
  bookDiv.appendChild(bookCover);

  //BOOK INFO//////////////////
  //creates <div> for the book info
  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book_info");

  //book pages
  //create <p> for book pages
  const bookPages = document.createElement("p");
  bookPages.classList.add("book_pages");
  bookPages.innerText = book.pageCount + " pgs.";
  bookInfo.appendChild(bookPages);

  //read button
  //create <button> for the "Read/Unread" button
  const bookReadBtn = document.createElement("button");
  bookReadBtn.value = bookDiv.id;
  bookReadBtn.classList.add("book_read");

  //adds class if chosen as "read" on submission
  if (book.hasRead){
    //enters if "Mark as Read" is checked
    bookReadBtn.classList.add("read");
    bookReadBtn.innerText = "Read";
  }
  else{
    //enters if "Mark as Read" is not checked
    bookReadBtn.innerText = "Unread";
  }

  //adds event listener to toggle read status
  bookReadBtn.addEventListener('click', toggleReadBook);

  //appends button to info area
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
  
  if (this.hasRead){
    //enters if it has been read
    console.log("I have read it.");
  }
  if (this.isFavorite){
    //enters if it's a favorite book
    console.log("It is one of my favorite books.")
  }
}

Book.prototype.addBookToLibrary = function(){
  //adds the book to the user's library
  myLibrary.push(this);
  //adds the book to the DOM
  createBook(this);
}

Book.prototype.toggleRead = function(){
  //toggles the .hasRead property within the object
  if (this.hasRead){
    //enters if it has been read, switch to false
    this.hasRead = false;
  }
  else{
    //enters if it hasn't been read, switches to true
    this.hasRead = true;
  }
}

Book.prototype.toggleFavorite = function(){
  //toggles the .isFavorite porperty within the object
  if (this.isFavorite){
    //enters if it is a favorite, switches to false
    this.isFavorite = false;
  }
  else{
    //enters if it is not a favorite, switches to true
    this.isFavorite = true;
  }
}


//////////////////////////////////////////////////////////

/*BUTTONS***********************************************/
function addBook(){
  //opens up modal to add a new book
  addModal.style.display = "block";
}
function toggleView(){
  //currently not working
  console.log("Toggle View.");
}
function exportBooks(){
  //currently not working
  console.log("Export.");
}
function signInUser(){
  //currently not working
  console.log("Login.")
}
//grabs buttons
const loginBtn = document.querySelector('#login-btn');
const addBtn = document.querySelector('#add-btn');
const toggleBtn = document.querySelector('#toggle-btn');
const exportBtn = document.querySelector('#export-btn');

//assigns button clicks
loginBtn.addEventListener('click',signInUser);
addBtn.addEventListener('click', addBook);
toggleBtn.addEventListener('click', toggleView);
exportBtn.addEventListener('click',exportBooks);
/////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////

/*MODAL**************************************************/
//grabs modal for new book
const addModal = document.getElementById("bookModal");

//grabs <inputs> from the modal
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

  //creates the form data
  const myFormData = new FormData(event.target);
  
  const bookData = {
    //defaults the favorite and read to false
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

  //converts the form data into a dictionary
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
