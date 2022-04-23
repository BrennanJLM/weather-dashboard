var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-search");
var currentCityName = document.querySelector("#current-city-name")
var currentCityTemp = document.querySelector("#current-city-temp")
var currentCityFeelslike = document.querySelector("#current-city-feelslike")
var currentCityWind = document.querySelector("#current-city-wind")
var currentCityHumidity = document.querySelector("#current-city-humidity")
var currentCityUVIndex = document.querySelector("#current-city-uvindex")
var submitButton = document.querySelector("#submit-button")


//button click
var formSubmitHandler = function () {

    //get value from input element
    var cityname = cityInputEl.value.trim()

    if (cityname) {
        // clear old content
        //currentWeather.textContent = "";
        getCityWeather(cityInputEl.value);

    } else {
        //alert user
        alert("Please enter a City name");
    }

}
//get latitude/longitude     
var getCityWeather = async function(location) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=d605dacbb35ec2fe801548d6b8c17a0d";
    fetch(apiUrl)
        .then(response => response.json())
		.then(data => {
			//console.log('DATA: ' + data)
			currentCityName.innerText = data[0].name;
			displayWeather(data[0].lat, data[0].lon);
        })
		.catch(function(err) {
			console.log(err);
			return false;
		});
		
};
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    formSubmitHandler();

})


//display weather
var displayWeather = async function(latitude, longitude) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=d605dacbb35ec2fe801548d6b8c17a0d";
    fetch(apiUrl)
        .then(response => response.json())
		.then(data => {
			
			//variables here
			
			
			//console.log('DATA: ' + data)
			currentCityTemp.innerText = data.current.temp;
			currentCityFeelslike.innerText = data.current.feels_like;
			currentCityWind.innerText = data.current.wind_speed;
			currentCityHumidity.innerText = data.current.humidity;
			currentCityUVIndex.innerText = data.current.uvi;
			if(data.current.uvi >= 1) {
				currentCityUVIndex.setAttribute('class', 'bg-danger text-white');
			} else if(data.current.uvi > 0) {
				currentCityUVIndex.setAttribute('class', 'bg-warning text-white');
			} else {
				currentCityUVIndex.setAttribute('class', 'bg-success text-white');
			}
			
			//5day here
			let card1 = document.createElement('li');
			card1.setAttribute('class', 'card d-inline-block');
			//<li class="card d-inline-block"><h4 class="card-header">Day 2</h4></li>
			
			document.querySelector('#current-city-5day ul').appendChild(card1);
            document.querySelector('#current-city-5day ul').appendChild(card1.cloneNode(true));
			document.querySelector('#current-city-5day ul').appendChild(card1.cloneNode(true));
			document.querySelector('#current-city-5day ul').appendChild(card1.cloneNode(true));
			document.querySelector('#current-city-5day ul').appendChild(card1.cloneNode(true));

            // Define the addItem() function
        // to be called through onclick
        function addItem() {
  
            // Get type of element from form
            let type = document.
                getElementById("type").value;
  
            // Get the text/value for the tag
            // from the form
            let value = document.
                getElementById("value").value;
  
            // createElement() is used for
            // creating a new element
            type
                = document.createElement(type);
  
            // Use value as textnode in this example
            type.appendChild(
                document.createTextNode(value));
  
            // Append as child to the parent
            // tag i.e. ol
            document.getElementById(
                "parent").appendChild(type);

            }

        })
		.catch(function(err) {
			console.log(err);
			return false;
		});
		
};
    


// var getForecast = function() {

// }

// var DisplayForecast = function() {

    // date.textContent=moment.unix(data.daily[i].dt).format("L");
    // icon.innerHTML="<img src='http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png'>";
    // temp.textContent= "Temp: " + Math.round(data.daily[i].temp.day) + " °C";
    // wind.textContent= "Wind: " + kph(data.daily[i].wind_speed) + " KPH";
    // humidity.textContent= "Humidity: " + data.daily[i].humidity + "%";