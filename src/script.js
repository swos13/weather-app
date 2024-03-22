import model from "./model";
import view from "./view";
import "./style.css"

const controller = (() => {


    const displayWeatherData = (city, current, forecast) => {
        view.clearWeatherContainer();
        view.displayLocationName(current.location.city, current.location.region, current.location.country);
        const weatherContainer = view.getWeatherContainer();
        const slider = view.createSliderContainer();
        const cardsContainer = view.createCardsContainer();
        const [leftButton, rightButton] = view.createButtons();
        view.appendChildren(slider, [leftButton, cardsContainer, rightButton]);
        view.appendChildren(weatherContainer, [slider]);
        const forecastCards = view.createForecastCards(forecast);
        model.allData = forecast;
        view.putItemsInCardsContainer(forecastCards);
        view.appendChildren(weatherContainer, [view.createDayDetails(forecast[0], current.time.getHours())]);
        const cards = Array.from(forecastCards);
        view.slideRight(cards, 1);
        let leftmostCardId = 0;
        
        leftButton.addEventListener('click', () => {
            if(leftmostCardId === 0){
                const previousDate = model.allData[0].date;
                previousDate.setDate(previousDate.getDate() - 1);
                if(model.isDataAvailable(previousDate)){
                    model.getHistory(city, previousDate).then((data) => {
                        model.allData.unshift(data);
                        const newCard = view.createForecastWeatherCard(data);
                        cards.unshift(newCard);
                        const translationValue = -view.getTranslation();
                        view.translateCard(newCard, translationValue);
                        cardsContainer.insertBefore(newCard, cardsContainer.firstChild);
                        view.slideRight(cards, leftmostCardId+1);
                    })
                }
            }
            else {
                view.slideRight(cards, leftmostCardId);
                leftmostCardId--;
            }
            
        })

        rightButton.addEventListener('click', () => {
            if(leftmostCardId === cards.length-3){
                const nextDate = model.allData[model.allData.length-1].date;
                nextDate.setDate(nextDate.getDate() + 1);
                if(model.isDataAvailable(nextDate)){
                    view.slideLeft(cards, leftmostCardId);
                    leftmostCardId--;
                }
            }
            else {
                view.slideLeft(cards, leftmostCardId);
                leftmostCardId++;
            }
            
        })

        window.addEventListener('resize', () => {
            view.slideLeft(cards, leftmostCardId)
            view.slideRight(cards, leftmostCardId+1);
        })
        
    }

    const getWeatherData = (city) => {
        Promise.all([model.getCurrentWeather(city), model.getForecast(city)])
        .then((data) => {
            displayWeatherData(city, data[0], data[1]);
        })
    }

    const setAutocompleteEvent = (coordinates, option) => {
        option.addEventListener('click', () => {
            getWeatherData(coordinates);
            view.clearAutocompleteContainer();
        })
    }

    const autocompleteSearch = (input) => {
        model.getAutocomplete(input).then((locations) => {
            const locationNames = [];
            const locationLatLon = []
            locations.forEach((location) => {
                let locationName = location.name;
                if(location.region.trim() !== '')
                    locationName += `, ${location.region}`;
                locationName += `, ${location.country}`;
                locationNames.push(locationName);
                locationLatLon.push(`${location.lat},${location.lon}`);
            })
            const options = view.createAutocomplete(locationNames);
            for(let i=0; i<options.length; i++){
                setAutocompleteEvent(locationLatLon[i], options[i]);
            }
        });
    }

    const start = () => {
        model.setUp();
        const searchButton = view.getSearchButton();
        const searchInput = view.getSearchInput();
        searchButton.addEventListener("click", () => {
            getWeatherData(searchInput.value);
        });
        searchInput.addEventListener("keypress", (event) => {
            if(event.key === "Enter"){
                event.preventDefault();
                searchButton.click();
            }
        });
        searchInput.addEventListener("input", () => {
            if (searchInput.value.length > 0)
                autocompleteSearch(searchInput.value);
        })
        searchInput.addEventListener("focus", () => {
            if (searchInput.value.length > 0)
                autocompleteSearch(searchInput.value);
        })
    }
    return { start }
})()


controller.start();

export default controller;