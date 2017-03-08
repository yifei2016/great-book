window.onload = function(){
  let add = document.getElementById("add");
  let addBook = document.getElementById("addBook");
  let viewButton = document.getElementById("viewButton");
  let view = document.getElementById("view");
  let inputTitle = document.getElementById("inputEmail3");
  let inputAuthor = document.getElementById("inputAuthor");
  add.addEventListener("click", function(event) {
   fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=M7y37&title=${inputTitle}&author=${inputAuthor}`)
     .then(function(res) {
       if (res.status !== 200) {
         addBook.innerHTML = 'Looks like there was a problem. Status Code: ' +
           res.status;
         return;
       } //if
       res.json().then(function(data) {
         if(data.status==="error"){
           addBook.innerHTML = `status: ${data.status}`;
         }
         else{
        //    addBook.innerHTML = `bookName: ${inputTitle.value},
        //    bookId: ${data.id}`;
         addBook.innerHTML="your book have been added";
        }

       }); //res.json
       // .catch(function(err) {
       //
       //   console.log(err);
       // });
     })//then func1
} )
viewButton.addEventListener("click", function(event) {
 fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=M7y37&title=${inputTitle}&author=${inputAuthor}`)
   .then(function(res) {
     if (res.status !== 200) {
       addBook.innerHTML = 'Looks like there was a problem. Status Code: ' +
         res.status;
       return;
     } //if
     res.json().then(function(data) {
         if(data.status==="error"){
           addBook.innerHTML = `status: ${data.status}`;
         }
         else{
          let listItems = document.createElement("p");
          listItems.innerHTML = `bookName: ${inputTitle.value}, bookId: ${data.id}`;
          addBook.appendChild(listItems);
        }

     }); //res.json
     // .catch(function(err) {
     //
     //   console.log(err);
     // });
   })//then func1
})

} //window load
