// Your code here
//set var from dom
var weather = document.getElementById('weather');
var form = document.querySelector('form');

//set API and open weather map url
var apiKey = '617b7365c8bfd199658b19781e4bb788'; // 
var URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

//start function for form submission
form.onsubmit = function (e) {
    e.preventDefault(); // prevent form from defaulting
    //retrieve search term
    var searchTerm = this.search.value.trim();
    if (!searchTerm) return; //if there is no search term, disregard
    this.search.value = '';

    // set formula for URL
    var weatherURL = URL + searchTerm + '&units=imperial&APPID=' + apiKey;

    // use fetch data function
    fetch(weatherURL)
        .then(function (res) {
            return res.json() //when the response is received, convert to json
        })
        .then(function (data) {
            console.log(data) //log json after it is converted
            weather.innerHTML = '' // clear previous data

            // display city name
            var h2 = document.createElement('h2') //create h2 element
            h2.textContent = data.name + ', ' + data.sys.country
            weather.appendChild(h2)

            // set link for location to be Google Mpas
            var mapLink = document.createElement('a') //create anchor elemet to display Google
            //set var for lat and longitude
            var longitude = data.coord.lon //set long
            var latitude = data.coord.lat //set lat
            mapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude; // set href
            mapLink.textContent = 'Click to view map' //set txt context to say click here XXX
            mapLink.target = '_blank' //open Google maps upon user click
            weather.appendChild(mapLink) //append anchor

            // set display for the image icon of the current weather condition
            var img = document.createElement('img');

            img.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
            weather.appendChild(img); //append image

            // set display for the description of current weather
            var currentConditions = document.createElement('p')
            currentConditions.style.textTransform = 'capitalize'
            currentConditions.textContent = data.weather[0].description
            weather.appendChild(currentConditions)

            // display current temp
            var currentTemp = document.createElement('p')
            currentTemp.textContent = 'Current: ' + data.main.temp + ' °F'
            weather.appendChild(currentTemp)

            // display the "feels liek" temperature
            var feelsLike = document.createElement('p')
            feelsLike.textContent = 'Feels Like: ' + data.main.feels_like + ' °F'
            weather.appendChild(feelsLike)

            // display most recent updated time
            var ms = data.dt * 1000
            var date = new Date(ms)
            var timeString = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            })

            var lastUpdated = document.createElement('p') // create p element
            lastUpdated.textContent = timeString
            weather.appendChild(lastUpdated) //append p element
        })
        .catch(function () {
            var notFound = document.createElement('p')
            notFound.textContent = 'Location not found'
            weather.appendChild(notFound)
        });
}
