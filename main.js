const myLibrary = [];
const form = document.querySelector('#form');

function Book() {

}

function addBookToLibrary(e) {
  e.preventDefault();
}

form.addEventListener('submit', addBookToLibrary);
