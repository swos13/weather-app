import model from "./model";
import view from "./view";
import "./style.css"

const controller = (() => {


    const displayWeatherData = (city, current, forecast) => {
        view.clearWeatherContainer();
        view.displayLocationName(current.location.city, current.location.country);
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

    const start = () => {
        model.setUp();
        const searchButton = view.getSearchButton();
        const searchInput = view.getSearchInput();
        let entered = false;
        searchButton.addEventListener("click", () => {
            entered = true;
            getWeatherData(searchInput.value);
        });
        searchInput.addEventListener("keypress", (event) => {
            if(event.key === "Enter" && entered === false){
                entered = true;
                event.preventDefault();
                searchButton.click();
            }
            else if (searchInput.value.length > 2){
                model.getAutocomplete(searchInput.value).then((locations) => view.createAutocomplete(locations));
            }
        });
        searchInput.addEventListener("change", () => {
            entered = false;
        });
    }
    return { start }
})()


controller.start();

export default controller;