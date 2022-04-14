var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-search");
var currentWeather = document.querySelector("#current-city-weath")

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();
    //get value from input element
    var cityname = cityInputEl.value.trim()

    if (cityname) {
        getCityWeather(cityname);
    
        // clear old content
        currentWeather.textContent = "";
        
      } else {
        alert("Please enter a City name");
      }

}

var getCityWeather = function() {

     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=d605dacbb35ec2fe801548d6b8c17a0d";

     fetch(apiUrl)
     .then (function(response) {

        if (response.ok)  {
            console.log(response)
            response.json().then(function(data) {
                console.log(data)
            }
     )}
    })
}

var displayWeather = function() {

}

var getForecast = function() {

}

var DisplayForecast = function() {
    
}