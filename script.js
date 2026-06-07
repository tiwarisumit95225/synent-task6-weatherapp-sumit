const apiKey = "72bfe71e85186d8e2b66f1435f6d7260";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherCard = document.querySelector(".weather-card");

async function getWeather(city) {

    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        loading.classList.add("hidden");

        if (!response.ok) {

            weatherCard.classList.add("hidden");

            error.textContent = "❌ Invalid city name";

            error.classList.remove("hidden");

            return;
        }


        weatherCard.classList.remove("hidden");

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
    catch (err) {

        loading.classList.add("hidden");

        weatherCard.classList.add("hidden");

        error.textContent =
            "❌ Invalid city name. Please try again.";

        error.classList.remove("hidden");

        console.log(err);
    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {

        getWeather(city);

        cityInput.value = "";
    }
});
cityInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        const city = cityInput.value.trim();

        if (city !== "") {

            getWeather(city);

            cityInput.value = "";
        }
    }
});
getWeather("Bhopal");