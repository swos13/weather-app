const view = (() => {

    const searchInput = document.querySelector("#city-name-input");
    const searchButton = document.querySelector(".search-button");
    const weatherContainer = document.querySelector(".weather-container");

    const getSearchInput = () => searchInput;
    const getSearchButton = () => searchButton;

    const appendChildren = (element, children) => {
        children.forEach((child) => {
            element.appendChild(child);
        })
    }

    const displayLocationName = (cityName, countryName) => {
        const locationContainer = document.createElement('div');
        locationContainer.classList.add('location-container');
        const city = document.createElement('div');
        city.classList.add('city-name');
        const country = document.createElement('div');
        country.classList.add('country-name');
        city.textContent = cityName;
        country.textContent = countryName;
        appendChildren(locationContainer, [city, country]);
        weatherContainer.appendChild(locationContainer);
    }

    const createCurrentWeather = (data) => {
        const card = document.createElement('div');
        card.classList.add('weather-card');

        const time = document.createElement('div');
        time.classList.add('time-container');
        time.textContent = data.time;

        const condition = document.createElement('div');
        condition.classList.add('condition-container');
        condition.textContent = `${data.tempC}C ${data.condition}`;

        const humidity = document.createElement('div');
        humidity.classList.add('humidity-container');
        humidity.textContent = `Humidity: ${data.humidity}%`;

        const wind = document.createElement('div');
        wind.classList.add('wind-container');
        wind.textContent = `Wind: ${data.wind}km/h`;

        appendChildren(card, [time, condition, humidity, wind]);
        return card;
    }

    const displayWeatherContainer = (data) => {
        displayLocationName(data.location.city, data.location.country);
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('cards-container');
        weatherContainer.appendChild(cardsContainer);
        cardsContainer.appendChild(createCurrentWeather(data));
    }

    return { getSearchInput, getSearchButton, displayWeatherContainer }
})();

export default view;