function fetchData(url) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = () => {
            (xhr.status == 200) ? resolve(xhr.response): reject(Error(xhr.statusText));
        };

        xhr.onerror = () => {
            reject(Error('Network Error!'));
        }

        xhr.send();
    })
}

fetchData('http://ip-api.com/json')
    .then(response => {
        console.log(response);
        let location = JSON.parse(response);
        return location;
    })
    .then(location => {
        const lat = location.lat;
        const lon = location.lon;
        return fetchData(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=9127c9c34a42acd7f89180689aa55b9f`);
    })
    .then(response => {
        const weather = JSON.parse(response);
        console.log(weather);

        let temp = document.getElementById("temp");
        temp.innerHTML = toCelcius(weather.main.temp);
    });

function toCelcius(temp) {
    return (temp - 272.15).toFixed(1);
}
