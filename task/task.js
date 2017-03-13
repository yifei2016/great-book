let bookList = document.getElementById("bookList");
let errorDiv = document.getElementById("errorDiv");
let add = document.getElementById("add");
let key = document.getElementById("key");
let viewButton = document.getElementById("viewButton");
let view = document.getElementById("view");
let inputTitle = document.getElementById("inputEmail3");
let inputAuthor = document.getElementById("inputAuthor");
let keyValue = document.getElementById("keyValue");
let deleteButton = document.getElementById("deleteButton");
let deleteInput = document.getElementById("deleteInput");
let modifyButton = document.getElementById("modifyButton");
let modifyTitle = document.getElementById("modifyTitle");
let modifyId = document.getElementById("modifyId");
let modifyAuthor = document.getElementById("modifyAuthor");
let newTitleInput = document.getElementById("newTitleInput");
let newAuthorInput = document.getElementById("newAuthorInput");
let oldBookinput = document.getElementById("oldBookId");
let page = 0;
function clearBooks(){
  while(bookList.hasChildNodes()){
    bookList.removeChild(bookList.lastChild);
  }
}

function listBook(limit=5){

    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=M7y37`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {

      if(data.status === "error") throw data.message;
      var books = data.data;;
      clearBooks();
      for(let i=books.length-1;i>=books.length-limit;i--){
        let listItems = document.createElement("li");
        listItems.className = "list-group-item list-group-item-success justify-content-between";
        listItems.id = books[i].id;
        listItems.innerHTML = `<p> bookTitle: <span class="titleClass">${books[i].title}</span>,
        bookAuthor: <span class="authorClass">${books[i].author}</span>,
        bookId: <span class="idClass">${books[i].id}</span></p>
        <div>
        <button type="button" class="btn-sm btn-info" onclick="editBook(event,'${books[i].id}','${books[i].title}','${books[i].author}')">
        <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>

        <button type="button" class="btn-sm btn-danger" onclick="deleteBook(event,${books[i].id})" >
        <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        </div>`;
        bookList.appendChild(listItems);
      }
    })
    .catch(function(error) {
        
      errorDiv.innerHTML = getError(error);
    });

}
function viewMoreBook(){
  page++;
  let limit = 5 + 5*page;
  listBook(limit);
}

function getError(message){
  return `<div class="alert alert-danger" role="alert">
  <strong>Oh snap!</strong> System error: ${message}.
  </div>`
}

function updateBook(event){
  let bookId = oldBookinput.value;
  let bookTitle = newTitleInput.value;
  let bookAuthor = newAuthorInput.value;
  fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=M7y37&id=${bookId}&title=${bookTitle}&author=${bookAuthor}`)
  .then(function(res) {
    return res.json()
  })
  .then(function(data) {
    if(data.status==="error") throw "Failed to add book";
    $('#editBookModal').modal('hide');
    listBook();
  })


  .catch(function(error){
     errorDiv2.innerHTML = getError(error);
  });
}

function editBook(event,bookId,bookTitle,bookAuthor){
  oldBookinput.value=bookId;
  newTitleInput.value = bookTitle;
  newAuthorInput.value = bookAuthor;
  $('#editBookModal').modal({})
}

function deleteBook(event,bookId){
  fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=M7y37&id=${bookId}`)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    if(data.status === "error") throw data.message;
    for(let i =0;i<bookList.childNodes.length;i++){
      let child = bookList.childNodes[i];
      if(child.nodeType !== Node.ELEMENT_NODE){
        continue;
      }
      if(bookId == child.id){
        let deletedBook = bookList.removeChild(child);
        errorDiv.innerHTML = `<p class="alert alert-warning" role="alert">Book: ${deletedBook.id} is deleted</p>`;
        break;//after finding book, exit loop
      }
    }
  })
  .catch(function(error) {
    errorDiv.innerHTML = `<p class="alert alert-warning" role="alert">It failed to delete book, because: ${error}</p>`;
  });
}

function addBook (){
    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=M7y37&title=${inputTitle.value}&author=${inputAuthor.value}`)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      if(data.status==="error") throw "Failed to add book";
      errorDiv.innerHTML='<p class="alert alert-warning" role="alert">your book have been added</p>';
    })
    .catch(function(error){
       errorDiv.innerHTML = getError(error);
    });
}

window.onload = function(){
  key.addEventListener("click", function(event) {
    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?requestKey`)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      keyValue.innerHTML = data.key;
    })
    .catch(function(error){

    });

  })

  // viewButton.addEventListener("click", listBook);








// let text = span.innerText
// document.removeChild
// let x = document.createElement("input")
// x.value = text;
// x.addEventListener('blur')
//
// element.appendChild  //replaceChild?










}
