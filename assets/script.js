






//button click
var formSubmitHandler = function () {

    //get value from input element
    var cityname = document.querySelector("#city-search").value.trim()

    if (cityname) {
        // clear old content
        //currentWeather.textContent = "";
        getCityWeather(cityname);
        
        document.querySelector("#current-city-weather").setAttribute("class","d-block");
        document.querySelector("#current-city-5day").setAttribute("class","d-block");
        //search 
        let newSearch = document.createElement("li");
        newSearch.setAttribute("class", "list-group-item");
        newSearch.innerText = cityname;
        document.querySelector("#city-search-history .list-group").appendChild(newSearch);
        //save history
        let oldSearch = sessionStorage.getItem("search");
        console.log("search:" +  oldSearch);
        let searchHistory = oldSearch ? JSON.parse(oldSearch) : JSON.parse('{"search":[]}');
        
        if(searchHistory) {
            searchHistory.search.push(cityname);
            sessionStorage.setItem("search", '{"search":["'+ searchHistory.search.join('","') +'"]}');
        }


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
            document.querySelector("#current-city-name").innerText = data[0].name;
			displayWeather(data[0].lat, data[0].lon);
        })
		.catch(function(err) {
			console.log(err);
			return false;
		});
		
};



//display weather
var displayWeather = async function(latitude, longitude) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=d605dacbb35ec2fe801548d6b8c17a0d";
    fetch(apiUrl)
        .then(response => response.json())
		.then(data => {
			
			//variables here
			
			
			//console.log('DATA: ' + data)
			document.querySelector("#current-city-temp").innerText = data.current.temp;
			document.querySelector("#current-city-feelslike").innerText = data.current.feels_like;
			document.querySelector("#current-city-wind").innerText = data.current.wind_speed;
			document.querySelector("#current-city-humidity").innerText = data.current.humidity;
			document.querySelector("#current-city-uvindex").innerText = data.current.uvi;
			if(data.current.uvi >= 1) {
				document.querySelector("#current-city-uvindex").setAttribute('class', 'bg-danger text-white');
			} else if(data.current.uvi > 0) {
				document.querySelector("#current-city-uvindex").setAttribute('class', 'bg-warning text-white');
			} else {
				document.querySelector("#current-city-uvindex").setAttribute('class', 'bg-success text-white');
			}
			
			//5day here
			
            let head1 = document.querySelector("#day1 h4");
            let day1 = moment.unix(data.daily[0].dt);
            // console.log("day1:"+data.daily[0].weather);
            head1.innerText = day1.format("YYYY/MM/DD");
            let cardImage1 = document.createElement("img");
            cardImage1.setAttribute("src", "http://openweathermap.org/img/wn/"+data.daily[0].weather[0].icon+"@2x.png");
            document.querySelector("#day1 .card-body .card-title").replaceChildren(cardImage1);
            document.querySelector("#day1 .list-group .temperature span").innerText = data.daily[0].temp.day;
            document.querySelector("#day1 .list-group .wind span").innerText = data.daily[0].wind_speed;
            document.querySelector("#day1 .list-group .humidity span").innerText = data.daily[0].humidity;
            
            let head2 = document.querySelector("#day2 h4");
            let day2 = moment.unix(data.daily[1].dt);
            // console.log("day2:"+day2);
            head2.innerText = day2.format("YYYY/MM/DD");
            let cardImage2 = document.createElement("img");
            cardImage2.setAttribute("src", "http://openweathermap.org/img/wn/"+data.daily[1].weather[0].icon+"@2x.png");
            document.querySelector("#day2 .card-body .card-title").replaceChildren(cardImage2);
            document.querySelector("#day2 .list-group .temperature span").innerText = data.daily[1].temp.day;
            document.querySelector("#day2 .list-group .wind span").innerText = data.daily[1].wind_speed;
            document.querySelector("#day2 .list-group .humidity span").innerText = data.daily[1].humidity;

            let head3 = document.querySelector("#day3 h4");
            let day3 = moment.unix(data.daily[2].dt);
            // console.log("day3:"+day3);
            head3.innerText = day3.format("YYYY/MM/DD");
            let cardImage3 = document.createElement("img");
            cardImage3.setAttribute("src", "http://openweathermap.org/img/wn/"+data.daily[2].weather[0].icon+"@2x.png");
            document.querySelector("#day3 .card-body .card-title").replaceChildren(cardImage3);
            document.querySelector("#day3 .list-group .temperature span").innerText = data.daily[2].temp.day;
            document.querySelector("#day3 .list-group .wind span").innerText = data.daily[2].wind_speed;
            document.querySelector("#day3 .list-group .humidity span").innerText = data.daily[2].humidity;

            let head4 = document.querySelector("#day4 h4");
            let day4 = moment.unix(data.daily[3].dt);
            // console.log("day4:"+day4);
            head4.innerText = day4.format("YYYY/MM/DD");
            let cardImage4 = document.createElement("img");
            cardImage4.setAttribute("src", "http://openweathermap.org/img/wn/"+data.daily[3].weather[0].icon+"@2x.png");
            document.querySelector("#day4 .card-body .card-title").replaceChildren(cardImage4);
            document.querySelector("#day4 .list-group .temperature span").innerText = data.daily[3].temp.day;
            document.querySelector("#day4 .list-group .wind span").innerText = data.daily[3].wind_speed;
            document.querySelector("#day4 .list-group .humidity span").innerText = data.daily[3].humidity;

            let head5 = document.querySelector("#day5 h4");
            let day5 = moment.unix(data.daily[4].dt);
            // console.log("day5:"+day5);
            head5.innerText = day5.format("YYYY/MM/DD");
            let cardImage5 = document.createElement("img");
            cardImage5.setAttribute("src", "http://openweathermap.org/img/wn/"+data.daily[4].weather[0].icon+"@2x.png");
            document.querySelector("#day5 .card-body .card-title").replaceChildren(cardImage5);
            document.querySelector("#day5 .list-group .temperature span").innerText = data.daily[4].temp.day;
            document.querySelector("#day5 .list-group .wind span").innerText = data.daily[4].wind_speed;
            document.querySelector("#day5 .list-group .humidity span").innerText = data.daily[4].humidity;
          


 


			
			
			// document.querySelector('#current-city-5day ul').appendChild(card1);
            // document.querySelector('#current-city-5day ul').appendChild(card2);
			// document.querySelector('#current-city-5day ul').appendChild(card3);
			// document.querySelector('#current-city-5day ul').appendChild(card4);
			// document.querySelector('#current-city-5day ul').appendChild(card5);

            


            // daily.data[0].temp





        // //     Define the addItem() function
        // // to be called through onclick
        // function forecast() {
  
        //     // Get type of element from form
        //     let type = document.daily.data
        //         getElementById("type").value;
  
        //     // Get the text/value for the tag
        //     // from the form
        //     let value = document.
        //         getElementById("value").value;
  
        //     // createElement() is used for
        //     // creating a new element
        //     type
        //         = document.createElement(type);
  
        //     // Use value as textnode in this example
        //     type.appendChild(
        //         document.createTextNode(value));
  
        //     // Append as child to the parent
        //     // tag i.e. ol
        //     document.getElementById(
        //         "parent").appendChild(type);

        //     }

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




document.addEventListener('DOMContentLoaded', function(ev) {

    document.querySelector("#submit-button").addEventListener("click", function(event) {
        event.preventDefault();
        formSubmitHandler();
    });

    //save history
    let oldSearch = sessionStorage.getItem("search");
    //console.log("search:" +  oldSearch);
    let searchHistory = oldSearch ? JSON.parse(oldSearch) : JSON.parse('{"search":[]}');
    searchHistory.search.forEach(function(el) {
        //search 
        let newSearch = document.createElement("li");
        newSearch.setAttribute("class", "list-group-item");
        newSearch.innerText = el;
        document.querySelector("#city-search-history .list-group").appendChild(newSearch);
    });

});

