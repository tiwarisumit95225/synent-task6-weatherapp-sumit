const apiKey = "b19c79e7658d31735174f942de3739e2";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

     if (!response.ok) {
    alert("City not found!");
    return;
}
        cityName.textContent = data.name;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
`${Math.round(data.wind.speed * 3.6)} km/h`;

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    }
    catch (error) {

        alert("Something went wrong!");

        console.log(error);
    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});