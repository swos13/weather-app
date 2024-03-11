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

    const createCurrentWeatherCard = (data) => {
        const card = document.createElement('div');
        card.classList.add('weather-card');

        const date = document.createElement('div');
        date.classList.add('date-container');
        date.textContent = `Today ${data.time.toLocaleDateString('en-GB')}`;

        const time = document.createElement('div');
        time.classList.add('time-container');
        time.textContent = `${data.time.getHours()}:${data.time.getMinutes()}`;

        const condition = document.createElement('div');
        condition.classList.add('condition-container');
        condition.textContent = `${data.tempC}C ${data.condition}`;

        const humidity = document.createElement('div');
        humidity.classList.add('humidity-container');
        humidity.textContent = `Humidity: ${data.humidity}%`;

        const wind = document.createElement('div');
        wind.classList.add('wind-container');
        wind.textContent = `Wind: ${data.wind}km/h`;

        appendChildren(card, [date, time, condition, humidity, wind]);
        return card;
    }

    const getConditionOfDay = (day) => {
        const conditions = [];
        day.hours.forEach((hour) => conditions.push(hour.condition));
        return conditions.sort((conditionA, conditionB) =>
            conditions.filter(condition => condition === conditionA).length
            - conditions.filter(condition => condition === conditionB).length
        ).pop();
    }

    const createForecastWeatherCard = (data) => {
        const card = document.createElement('div');
        card.classList.add('weather-card');

        const date = document.createElement('div');
        date.classList.add('date-container');
        date.textContent = `${data.date.toLocaleDateString('en-GB', { weekday: 'long' })} ${data.date.toLocaleDateString('en-GB')}`;

        const condition = document.createElement('div');
        condition.classList.add('condition-container');
        condition.textContent = `${data.avgTempC}C ${getConditionOfDay(data)}`;

        const humidity = document.createElement('div');
        humidity.classList.add('humidity-container');
        humidity.textContent = `Humidity: ${data.avgHumidity}%`;

        const wind = document.createElement('div');
        wind.classList.add('wind-container');
        wind.textContent = `Wind: ${data.maxWind}km/h`;

        appendChildren(card, [date, condition, humidity, wind]);
        return card;
    }

    const createForecastCards = (forecast) => {
        const cards = [];
        forecast.forEach((day) => {
            cards.push(createForecastWeatherCard(day));
        })
        return cards;
    }

    const clearWeatherContainer = () => {
        while(weatherContainer.lastChild)
            weatherContainer.removeChild(weatherContainer.lastChild);
    }

    const displayWeatherData = (current, forecast) => {
        clearWeatherContainer();
        displayLocationName(current.location.city, current.location.country);
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('cards-container');
        weatherContainer.appendChild(cardsContainer);
        cardsContainer.appendChild(createCurrentWeatherCard(current));
        appendChildren(cardsContainer, createForecastCards(forecast));
    }

    return { getSearchInput, getSearchButton, displayWeatherData }
})();

export default view;