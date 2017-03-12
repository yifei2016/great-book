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



function getError(message){
  return `<div class="alert alert-danger" role="alert">
  <strong>Oh snap!</strong> System error: ${message}.
  </div>`
}

function updateBook(event,bookId){
  debugger
  fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=M7y37&id=${bookId}&title=${newTitleInput.value}&author=${newAuthorInput.value}`)
  .then(function(res) {
    return res.json()
  })
  .then(function(data) {
    if(data.status==="error") throw "Failed to add book";
    errorDiv2.innerHTML='<p class="alert alert-warning" role="alert">your book have been added</p>';
  })
  .catch(function(error){
     errorDiv2.innerHTML = getError(error);
  });
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
        break;
      }
    }
  })
  .catch(function(error) {
    errorDiv.innerHTML = `<p class="alert alert-warning" role="alert">It failed to delete book, because: ${error}</p>`;
  });
}

function addFunction (){
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

  viewButton.addEventListener("click", function(event) {
    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=M7y37`)
    .then(function(res) {
      return res.json();

    })
    .then(function(data) {
      if(data.status === "error") throw data.message;
      var books = data.data;
      for(let i=books.length-1;i>=books.length-5;i--){
          let listItems = document.createElement("li");
          listItems.className = "list-group-item list-group-item-success justify-content-between";
          listItems.id = books[i].id;
          listItems.innerHTML = `<p> bookTitle: <span class="titleClass">${books[i].title}</span>,
          bookAuthor: <span class="authorClass">${books[i].author}</span>,
          bookId: <span class="idClass">${books[i].id}</span></p>
          <div>
            <button type="button" class="btn-sm btn-info" data-toggle="modal" data-target="#editBookModal">
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
  });








// let text = span.innerText
// document.removeChild
// let x = document.createElement("input")
// x.value = text;
// x.addEventListener('blur')
//
// element.appendChild  //replaceChild?










}
