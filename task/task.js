window.onload = function(){
  let add = document.getElementById("add");
  let addBook = document.getElementById("addBook");
  let viewButton = document.getElementById("viewButton");
  let view = document.getElementById("view");
  let inputTitle = document.getElementById("inputEmail3");
  let inputAuthor = document.getElementById("inputAuthor");
  function getError(message){
    return `<div class="alert alert-danger" role="alert">
    <strong>Oh snap!</strong> System error: ${message}.
    </div>`
  }
  add.addEventListener("click", function(event) {

    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=M7y37&title=${inputTitle.value}&author=${inputAuthor.value}`)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      if(data.status==="error") throw "Failed to add book";
      addBook.innerHTML="your book have been added";
    })
    .catch(function(error){
       addBook.innerHTML = getError(error);
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
      for(let i=books.length-1;i>=400;i--){
        let listItems = document.createElement("p");
        listItems.innerHTML = `bookTitle: ${books[i].title}, bookAuthor: ${books[i].author}, bookId: ${books[i].id}`;
        addBook.appendChild(listItems);
      }
    })
    .catch(function(error) {
      addBook.innerHTML = getError(error);
    });
  });
}
