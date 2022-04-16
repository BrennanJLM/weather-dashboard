var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-search");
var currentWeather = document.querySelector("#current-city-weath")
var submitButton = document.querySelector("#submit-button")


//button click
var formSubmitHandler = function () {

    //get value from input element
    var cityname = cityInputEl.value.trim()

    if (cityname) {
        // clear old content
        currentWeather.textContent = "";

        getCityWeather();

    } else {
        //alert user
        alert("Please enter a City name");
    }

}
//get latitude/longitude     
var getCityWeather = function () {

    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=d605dacbb35ec2fe801548d6b8c17a0d";

    fetch(apiUrl)
        .then(function (response) {

            if (response.ok) {
                console.log(response)
                return response.json()
            }

        })
        .then(function (data) {
            console.log(data)

            var latitude = data[0].lat;
            var longitude = data[0].lon;

            displayWeather(latitude,longitude, location);


        })
}
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    formSubmitHandler();

})


//display weather
var displayWeather = function (latitude, longitude, location) {
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=metric&appid=d605dacbb35ec2fe801548d6b8c17a0d";
    
    fetch(apiUrl)
      .then(function (response) {

        if (response.ok) {
            console.log(response)
            return response.json()
        
            .then(function (data) {
            displayWeather(data)
            })

       

    }})
}
    


// var getForecast = function() {

// }

// var DisplayForecast = function() {