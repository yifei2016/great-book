(function(window,document){
  //searchTest = document.getElementById("search").value;
  let weather = new Weather("Paris");

  weather.getData()
    .then(function(da){
      console.log(da);
    });
  window.weatherInstance = weather;
})(window,document)
