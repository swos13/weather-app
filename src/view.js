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

    const createCardsContainer = () => {
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('cards-container');
        return cardsContainer;
    }

    const getWeatherContainer = () => weatherContainer;

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
        if(data.time.getMinutes() === 0) time.textContent += '0';

        const icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = data.condition.iconUrl;

        const condition = document.createElement('div');
        condition.classList.add('condition-container');
        condition.textContent = `${data.tempC}C ${data.condition.text}`;

        const humidity = document.createElement('div');
        humidity.classList.add('humidity-container');
        humidity.textContent = `Humidity: ${data.humidity}%`;

        const wind = document.createElement('div');
        wind.classList.add('wind-container');
        wind.textContent = `Wind: ${data.wind}km/h`;

        appendChildren(card, [date, time, icon,condition, humidity, wind]);
        return card;
    }

    const getConditionOfDay = (hours) => {
        const conditions = [];
        hours.forEach((hour) => conditions.push(hour.condition));
        return conditions.sort((conditionA, conditionB) =>
            conditions.filter(condition => condition.text === conditionA.text).length
            - conditions.filter(condition => condition.text === conditionB.text).length
        ).pop();
    }

    const createForecastWeatherCard = (data) => {
        const card = document.createElement('div');
        card.classList.add('weather-card');

        const date = document.createElement('div');
        date.classList.add('date-container');
        
        let day = '';
        if((new Date()).toLocaleDateString('en-GB') === data.date.toLocaleDateString('en-GB')) day = 'Today';
        else day = data.date.toLocaleDateString('en-GB', { weekday: 'long' });

        date.textContent = `${day} ${data.date.toLocaleDateString('en-GB')}`;

        const conditionData = getConditionOfDay(data.hours.slice(6, 22));

        const icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = conditionData.iconUrl;

        const condition = document.createElement('div');
        condition.classList.add('condition-container');
        condition.textContent = `${data.avgTempC}C ${conditionData.text}`;

        const humidity = document.createElement('div');
        humidity.classList.add('humidity-container');
        humidity.textContent = `Humidity: ${data.avgHumidity}%`;

        const wind = document.createElement('div');
        wind.classList.add('wind-container');
        wind.textContent = `Wind: ${data.maxWind}km/h`;

        appendChildren(card, [date, icon, condition, humidity, wind]);
        return card;
    }

    const createForecastCards = (forecast) => {
        const cards = [];
        forecast.forEach((day) => {
            cards.push(createForecastWeatherCard(day));
        })
        return cards;
    }

    const displayDayDetails = (data, hour) => {
        if(parseInt((new Date()).getMinutes(), 10) > 30)
            hour++;
        const card = createCurrentWeatherCard(data.hours[hour]);
        card.classList.add('details');
        return card;
    }

    const clearWeatherContainer = () => {
        while(weatherContainer.lastChild)
            weatherContainer.removeChild(weatherContainer.lastChild);
    }

    return { appendChildren, displayLocationName, createCardsContainer, createForecastCards, getWeatherContainer, getSearchInput, getSearchButton, createCurrentWeatherCard, displayDayDetails, clearWeatherContainer }
})();

export default view;