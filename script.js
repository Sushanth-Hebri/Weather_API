API_KEY='7f2847f45cfd99c08cd9d979d939bb21';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${API_KEY}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        updateWeather(data);
    }
}

function updateWeather(data) {
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main.toLowerCase()) {
        case 'clouds':
            weatherIcon.src = "/images/clouds.png";
            break;
        case 'clear':
            weatherIcon.src = "/images/clear.png";
            break;
        case 'rain':
            weatherIcon.src = "/images/rain.png";
            break;
        case 'drizzle':
            weatherIcon.src = "/images/drizzle.png";
            break;
        case 'mist':
            weatherIcon.src = "/images/mist.png";
            break;
        default:
            weatherIcon.src = "/images/unknown.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Function to get weather for current location
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Use OpenWeatherMap API to get weather information based on latitude and longitude
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        updateWeather(data);
                    })
                    .catch(error => {
                        console.error('Error fetching weather data:', error);
                    });
            },
            error => {
                console.error('Error getting current location:', error);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Add an event listener for the "Get Current Location Weather" button
document.querySelector('.location button').addEventListener("click", () => {
    getCurrentLocationWeather();
});
