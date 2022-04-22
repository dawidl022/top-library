let myLibrary;

function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
}

Book.prototype.toTableCells = function() {
  return `<td>${this.title}</td>
    <td>${this.author}</td>
    <td>${this.pageCount}</td>
    <td>${this.read}</td>`;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

if (localStorage.getItem('library') === null) {
  // demo book
  myBook = new Book("How to Win Friends and Influence People", "Dale Carnegie", 268, false);
  myLibrary = [myBook];
} else {
  myLibrary = JSON.parse(localStorage.getItem('library'));
  // after deserialization the prototype needs to be set up manually
  myLibrary.forEach(book => {
    Object.setPrototypeOf(book, Book.prototype);
  })
}

const form = document.querySelector('#form');
const tableBody = document.querySelector('#table tbody');
const showFormButton = document.querySelector("#show-form-btn");

function addBookToLibrary(e) {
  e.preventDefault();
  myLibrary.push(new Book(
    form.title.value, form.author.value, form['page-count'].value,
    form.read.checked ? true : false
  ));
  displayBooks(myLibrary);
}

function displayBooks(library) {
  function createReadCell(book, row) {
    const readCell = document.createElement('td');
    const readButton = document.createElement('button');

    readButton.addEventListener('click', () => {
      book.toggleRead();
      displayBooks(library);
    });

    readButton.textContent = book.read ? "Mark as not read" : "Mark as read";
    readButton.className = 'btn btn-secondary';

    readCell.appendChild(readButton);
    row.appendChild(readCell);
  }

  function createDeleteCell(index, row) {
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    deleteButton.addEventListener('click', () => {
      library.splice(index, 1);
      displayBooks(library);
    });

    deleteButton.textContent = "Delete";
    deleteButton.className = 'btn btn-danger';

    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
  }

  tableBody.textContent = "";

  library.forEach((book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = book.toTableCells();

    createReadCell(book, row);
    createDeleteCell(index, row);

    tableBody.appendChild(row);
  });

  localStorage.setItem('library', JSON.stringify(myLibrary));
}

displayBooks(myLibrary);

form.addEventListener('submit', addBookToLibrary);


showFormButton.addEventListener('click', () => {
  form.classList.toggle('hidden');

  showFormButton.textContent =
    form.classList.contains('hidden') ? 'Add new book' : 'Close form';
  showFormButton.className =
    form.classList.contains('hidden') ? 'btn btn-primary' : 'btn btn-danger';
  showFormButton.classList.add('center');
});
