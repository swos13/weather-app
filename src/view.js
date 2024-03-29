const view = (() => {

    const searchInput = document.querySelector("#city-name");
    const searchButton = document.querySelector(".search-button");
    const weatherContainer = document.querySelector(".weather-container");
    const autocompleteContainer = document.querySelector('.autocomplete-container');
    let cardsContainer;

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

    const createAutocomplete = (locations) => {
        while(autocompleteContainer.lastChild && autocompleteContainer.lastChild !== searchInput)
            autocompleteContainer.removeChild(autocompleteContainer.lastChild);
        const height = searchInput.offsetHeight-4;
        let multiplier = 0;
        const locationOptions = [];
        locations.forEach((location) => {
            const city = document.createElement('div');
            city.classList.add('city-autocomplete');
            city.style.transform = `translateY(${height*multiplier}px)`;
            city.textContent = location;
            multiplier++;
            autocompleteContainer.appendChild(city);
            locationOptions.push(city);
        })
        return locationOptions;
    }

    const clearAutocompleteContainer = () => {
     while(autocompleteContainer.lastChild && autocompleteContainer.lastChild !== searchInput)
            autocompleteContainer.removeChild(autocompleteContainer.lastChild);
    }

    const createSliderContainer = () => {
        const slider = document.createElement('div');
        slider.classList.add('slider');
        return slider;
    }

    const createCardsContainer = () => {
        cardsContainer = document.createElement('div');
        cardsContainer.classList.add('cards-container');
        return cardsContainer;
    }

    const getWidthOfForecastCard = () => Math.floor((cardsContainer.offsetWidth-64)/3);

    const getTranslation = () => getWidthOfForecastCard()+32;

    const translateCard = (card, translation) => {
        card.style.transform = `translateX(${translation}px)`;
    }

    const slideRight = (cards, leftmostCardId) => {
        const translationX = getTranslation();
        for(let i = 0; i < cards.length; i++)
            translateCard(cards[i],(i-leftmostCardId+1)*translationX);
    }

    const slideLeft = (cards, leftmostCardId) => {
        const translationX = getTranslation();
        for(let i = 0; i < cards.length; i++)
            translateCard(cards[i],(i-leftmostCardId-1)*translationX);
    }

    const putItemsInCardsContainer = (items) => {
        while(cardsContainer.lastChild) cardsContainer.removeChild(cardsContainer.lastChild);
        appendChildren(cardsContainer, items);
    }

    const createButtons = () => {
        const leftButton = document.createElement('button');
        leftButton.classList.add('left-button');
        leftButton.textContent = '<';

        const rightButton = document.createElement('button');
        rightButton.classList.add('right-button');
        rightButton.textContent = '>';

        return [leftButton, rightButton];
    }

    const getWeatherContainer = () => weatherContainer;

    const displayLocationName = (cityName, regionName, countryName) => {
        const locationContainer = document.createElement('div');
        locationContainer.classList.add('location-container');
        const city = document.createElement('div');
        city.classList.add('city-name');
        const region = document.createElement('div');
        region.classList.add('region-name');
        const country = document.createElement('div');
        country.classList.add('country-name');
        city.textContent = cityName;
        region.textContent = regionName;
        country.textContent = countryName;
        appendChildren(locationContainer, [city, region, country]);
        weatherContainer.appendChild(locationContainer);
    }

    const createCard = (className) => {
        const card = document.createElement('div');
        card.classList.add(className);
        return card;
    }

    const createCardWithDate = (dateData) => {
        const card = createCard('weather-card');

        const day = document.createElement('div');
        day.classList.add('day-container');

        let dayName = '';
        if((new Date()).toLocaleDateString('en-GB') === dateData.toLocaleDateString('en-GB')) dayName = 'Today';
        else dayName = dateData.toLocaleDateString('en-GB', { weekday: 'long' });

        day.textContent = dayName;

        const date = document.createElement('div');
        date.classList.add('date-container');

        date.textContent = dateData.toLocaleDateString('en-GB');

        appendChildren(card, [day, date]);

        return card;
    }

    const createWeatherSummary = (data) => {
        const condition = document.createElement('div');
        condition.classList.add('condition-container');
        condition.textContent = `${data.tempC}\u00B0C ${data.condition.text}`;

        const humidity = document.createElement('div');
        humidity.classList.add('humidity-container');
        humidity.textContent = `Humidity: ${data.humidity}%`;

        const wind = document.createElement('div');
        wind.classList.add('wind-container');
        wind.textContent = `Wind: ${data.wind}km/h`;

        return [condition, humidity, wind];
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

    const clearDayDetails = () => {
        weatherContainer.removeChild(document.querySelector('.details'))
    }

    const createDayDetails = (data, currentHour) => {
        if(parseInt((new Date()).getMinutes(), 10) > 30)
            currentHour++;
        const card = createCardWithDate(data.hours[currentHour].time);
        card.classList.remove('weather-card');
        card.classList.add('details');
        const hoursContainer = document.createElement('div');
        hoursContainer.classList.add('hours-container');
        data.hours.forEach((hour) => {
            const hourContainer = document.createElement('div');
            hourContainer.classList.add('hour-container');

            const text = document.createElement('a');
            text.classList.add('hour');
            text.textContent = `${hour.time.getHours()}:00`;

            const icon = document.createElement('img');
            icon.classList.add('icon');
            icon.src = hour.condition.iconUrl;

            hourContainer.addEventListener('click', () => {
                document.querySelector('.hour-container.active').classList.remove('active');
                hourContainer.classList.add('active');
                while(card.lastChild && card.lastChild !== hoursContainer)
                    card.removeChild(card.lastChild)
                const time = document.createElement('div');
                time.textContent = `${hour.time.getHours()}:00`;
                time.classList.add('time-container');
                appendChildren(card, [time, ...createWeatherSummary(data.hours[hour.time.getHours()])]);
            })

            appendChildren(hourContainer, [text, icon]);
            hoursContainer.appendChild(hourContainer);
        })
        hoursContainer.children.item(currentHour).classList.add('active');
        card.appendChild(hoursContainer);
        const weatherData = createWeatherSummary(data.hours[currentHour]);
        const time = document.createElement('div');
        time.textContent = `${currentHour}:00`;
        time.classList.add('time-container');
        appendChildren(card, [time, ...weatherData]);
        return card;
    }

    const clearWeatherContainer = () => {
        while(weatherContainer.lastChild)
            weatherContainer.removeChild(weatherContainer.lastChild);
    }


    const createForecastWeatherCard = (data) => {
        const card = createCardWithDate(data.date);
        card.style.width = `${getWidthOfForecastCard()}`;

        const conditionData = getConditionOfDay(data.hours);

        const icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = conditionData.iconUrl;

        const condition = document.createElement('div');
        condition.classList.add('condition-container');
        condition.textContent = `${data.avgTempC}\u00B0C ${conditionData.text}`;

        const humidity = document.createElement('div');
        humidity.classList.add('humidity-container');
        humidity.textContent = `Humidity: ${data.avgHumidity}%`;

        const wind = document.createElement('div');
        wind.classList.add('wind-container');
        wind.textContent = `Wind: ${data.maxWind}km/h`;

        appendChildren(card, [icon, condition, humidity, wind]);

        card.addEventListener('click', () => {
            clearDayDetails();
            appendChildren(weatherContainer, [createDayDetails(data, (new Date()).getHours())]);
        });
        
        return card;
    }

    const createForecastCards = (forecast) => {
        const cards = [];
        forecast.forEach((day) => {
            cards.push(createForecastWeatherCard(day));
        })
        return cards;
    }

    return { appendChildren, removeFromView, displayLocationName, getTranslation, 
        createSliderContainer, createCardsContainer, translateCard, 
        slideRight, slideLeft, putItemsInCardsContainer, createButtons, createForecastCards, 
        getWeatherContainer, getSearchInput, getSearchButton, createAutocomplete, 
        clearAutocompleteContainer, clearDayDetails, createForecastWeatherCard,
        createDayDetails, clearWeatherContainer }
})();

export default view;