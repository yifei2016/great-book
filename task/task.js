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
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let items = document.getElementsByClassName("filter");
let pagination = document.getElementById("pagination");
let page = 1;
const perPage = 7;
let books;
function clearBooks(){
  while(bookList.hasChildNodes()){
    bookList.removeChild(bookList.lastChild);
  }
}
// function getTime(timestamp){
//   let d = new Date(timestamp * 1000);
//   let year = d.getFullYear();
//   let month = d.getMonth()+1;
//   let date = d.getDate();
//   let hour =d.getHours();
//   let minute = d.getMinutes();
//   let fullTime = `${year}-${month}-${date},${hour}:${minute}`;
//   return fullTime;
// }
function bookLoop(){
  clearBooks();
  let start = page * perPage - perPage;
  let end = (page * perPage) > books.length ? books.length : (page * perPage);
  // let end;
  // if((page * perPage) > books.length){
  //   end = books.length
  // }else{
  //   end = page * perPage;
  // }
  //
  // let end = page*perPage;;
  // if(end > books.length){
  //   end = books.length;
  // }
  let prev = document.getElementById("prev");
  if(page === 1){
     prev.className += " disabled";
  }else{
    prev.classList.remove("disabled");
  }
  let next = document.getElementById("next");
  if((page *perPage) > books.length){
    next.className += " disabled";
  }else{
    next.classList.remove("disabled");
  }

  // debugger
  // prev.disabled = (page === 1) ?  true : false
  // // if(page = 1){
  //   prev.disabled = true;
  // }else{
  //   prev.disabled = false;
  // }
  for(let i = start; i < end; i++){
    let listItems = document.createElement("tr");
    if(books[i]===undefined){
      continue;
    }
    listItems.innerHTML = `<tr> <td><span class="idClass">${books[i].id}</span></td>
    <td> <span   data-animation="false" data-toggle="tooltip" data-placement="top" title="${books[i].title}" class="titleClass">${books[i].title}</span></td>
    <td ><span data-animation="false" data-toggle="tooltip" data-placement="top" title="${books[i].author}" class="authorClass">${books[i].author}</span></td>
    <td><span class="UpdateTimeClass">${books[i].updated}</span></td>
    <td class="d-flex justify-content-around">

    <button type="button" class="btn-sm btn-info" onclick="editBook(event,'${books[i].id}','${books[i].title}','${books[i].author}')">
    <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
    <button type="button" class="btn-sm btn-danger" onclick="deleteBook(event,${books[i].id})" >
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>

   </td>

    </tr>`;
    bookList.appendChild(listItems);
  }
}

function listBook(){
  fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=M7y37`)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    if(data.status === "error") throw data.message;
    errorDiv.innerHTML = "";
    books = data.data.reverse();
    createPagination();
    bookLoop();
  })
  .catch(function(error) {
    errorDiv.innerHTML = getError(error);
  });
}

function clearActiveState(){
  let children = pagination.children;
  for(let i =0;i<children.length;i++){
    let child = children[i];
    child.classList.remove("active");
  }
}

function createPagination(){
  pagination.innerHTML = "";
  // while(pagination.hasChildNodes()){
  //   pagination.removeChild(pagination.lastChild);
  // }
  let prev = document.createElement("li");
  prev.className = "page-item";
  prev.id = "prev";
  prev.addEventListener("click",function(event){
    if(page === 1){
      return;
    }
    page--;
    clearActiveState();
    pagination.childNodes[page].className += " active";
    bookLoop();
  });

  prev.innerHTML = `<a class="page-link" href="#" aria-label="Previous">
  <span aria-hidden="true">&laquo;</span>
  <span class="sr-only" id="previous">Previous</span>
  </a>`
  pagination.appendChild(prev);
  let pageNumber =0;
  for(let p =0; p<=books.length; p = p+perPage){
    pageNumber++;
    let li = document.createElement("li");
    li.className = "page-item";
    li.addEventListener('click',function(event){
      clearActiveState();
      this.className += " active";
      page = Number(event.target.innerText);
      bookLoop();
    });
    li.innerHTML = `<span class="page-link filter" href="#">${pageNumber}</span>`
    pagination.appendChild(li);
  }
  let next = document.createElement("li");
  next.className = "page-item";
  next.id = "next";
  next.addEventListener("click",function(event){
    if(page *perPage > books.length){
      return;
    }
    page++;
    let children = pagination.children;
    clearActiveState();
    pagination.childNodes[page].className += " active";

    bookLoop();
  })
  next.innerHTML = ` <a class="page-link" href="#" aria-label="Next">
  <span aria-hidden="true" >&raquo;</span>
  <span class="sr-only" id="next" >Next</span>
  </a>`
  pagination.appendChild(next);
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
