fetch('http://ip-api.com/json')
    .then(response => {
        return response.json().then(data => data);
    })
    .then(location => {
        const { city } = location;
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9127c9c34a42acd7f89180689aa55b9f&units=metric`);
    })
    .then(response => {
        response.json().then(weatherData => {

            let tempContainer = document.getElementById("temp");
            let weatherContainer = document.querySelector('.description');
            let locationContainer = document.querySelector('.location');
            let dateContainer = document.querySelector('.date-today');
            let windSpeedContainer = document.querySelector('.wind-speed');
            let humidityContainer = document.querySelector('.humidity');

            let { main, description } = weatherData.weather.find(elem => elem);
            let { speed } = weatherData.wind;
            let {temp, humidity } = weatherData.main;

            tempContainer.innerHTML = temp.toFixed();
            weatherContainer.innerHTML = description;
            locationContainer.innerHTML = weatherData.name;
            windSpeedContainer.innerHTML = `${speed} MPH`;
            humidityContainer.innerHTML = `${humidity} %`

            let date = new Date(),
                locale = "en-us",
                month = date.toLocaleString(locale, { month: "long" });
            dateContainer.innerHTML = `${month} <br /> ${date.getDate()}`;
            setWeatherIcon(`img/weather-${main.toLowerCase()}.png`);
        });
    });


const units = document.getElementById('units');
units.addEventListener('click', (e) => {
    const tempValue = units.previousSibling;
    if (units.innerHTML !== 'F') {
        tempValue.innerHTML = toFarenheit(tempValue.innerHTML).toFixed(0);
        units.innerHTML = 'F';
    } else {
        tempValue.innerHTML = toCelcius(tempValue.innerHTML).toFixed(0);
        units.innerHTML = '&deg;C';
    }
})

function toFarenheit(temp) {
    return (9 * temp) / 5 + 32;
}

function toCelcius(temp) {
    return (temp - 32) * 5 / 9;
}

function setWeatherIcon(weatherType) {
    const icon = document.getElementById('weather-icon');
    icon.setAttribute('src', weatherType);
}
