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

    const removeFromView = (parent, child) => {
        parent.removeChild(child);
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

    const createCard = (className) => {
        const card = document.createElement('div');
        card.classList.add(className);
        return card;
    }

    const createCardWithDate = (dateData) => {
        const card = createCard('weather-card');

        const date = document.createElement('div');
        date.classList.add('date-container');

        let day = '';
        if((new Date()).toLocaleDateString('en-GB') === dateData.toLocaleDateString('en-GB')) day = 'Today';
        else day = dateData.toLocaleDateString('en-GB', { weekday: 'long' });

        date.textContent = `${day} ${dateData.toLocaleDateString('en-GB')}`;

        card.appendChild(date);

        return card;
    }

    const createCurrentWeather = (data) => {
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

        return [icon, condition, humidity, wind];
    }

    const createCurrentWeatherCard = (data) => {
        const card = createCardWithDate(data.time);

        const time = document.createElement('div');
        time.classList.add('time-container');
        time.textContent = `${data.time.getHours()}:${data.time.getMinutes()}`;
        if(data.time.getMinutes() === 0) time.textContent += '0';

        appendChildren(card, [time, ...createCurrentWeather(data)]);
        return card;
    }

    const getConditionOfDay = (hours) => {
        const conditions = [];
        hours.forEach((hour) => {
            if(hour.condition.iconUrl.includes('day'))
                conditions.push(hour.condition);
        });
        return conditions.sort((conditionA, conditionB) =>
            conditions.filter(condition => condition.text === conditionA.text).length
            - conditions.filter(condition => condition.text === conditionB.text).length
        ).pop();
    }

    const createForecastWeatherCard = (data) => {
        const card = createCardWithDate(data.date);

        const conditionData = getConditionOfDay(data.hours);

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

        appendChildren(card, [icon, condition, humidity, wind]);
        return card;
    }

    const createForecastCards = (forecast) => {
        const cards = [];
        forecast.forEach((day) => {
            cards.push(createForecastWeatherCard(day));
        })

        return cards;
    }

    const clearDayDetails = () => {
        weatherContainer.removeChild(document.querySelector('.details'))
    }

    const createDayDetails = (data, currentHour) => {
        if(parseInt((new Date()).getMinutes(), 10) > 30)
            currentHour++;
        const card = createCardWithDate(data.hours[currentHour].time);
        card.classList.add('details');
        const hoursContainer = document.createElement('div');
        hoursContainer.classList.add('hours-container');
        data.hours.forEach((hour) => {
            const text = document.createElement('a');
            text.classList.add('hour');
            text.textContent = `${hour.time.getHours()}:00`;
            hoursContainer.appendChild(text);
        })
        hoursContainer.children.item(currentHour).classList.add('active');
        card.appendChild(hoursContainer);
        const weatherData = createCurrentWeather(data.hours[currentHour])
        appendChildren(card, weatherData);
        // add each hour with link - first add day name with date, then all hours and then details of these hours
        return card;
    }

    const clearWeatherContainer = () => {
        while(weatherContainer.lastChild)
            weatherContainer.removeChild(weatherContainer.lastChild);
    }

    return { appendChildren, removeFromView, displayLocationName, createCardsContainer, createForecastCards, getWeatherContainer, getSearchInput, getSearchButton, createCurrentWeatherCard, clearDayDetails, createDayDetails, clearWeatherContainer }
})();

export default view;