(function(window){

  function Weather(city){
    this.city = city;
  }

  Weather.prototype.getData = function() {
      return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=2d3055ddb7941ccc16f48f3aaeb29121&units=metric`)
      .then(function(res){
        return res.json();
      }) //chain
      .then(function(data){
        
        return {windSpeed: data.wind.speed,temperature: data.main.temp };
      });
  }
  window['Weather'] = Weather;

})(window)

////////////////////////


//function test(w){ //undefined
//}

//test(window);
