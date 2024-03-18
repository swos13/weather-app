import model from "./model";
import view from "./view";
import "./style.css"

const controller = (() => {

    let currentCards = [];

    const displayWeatherData = (current, forecast) => {
        view.clearWeatherContainer();
        view.displayLocationName(current.location.city, current.location.country);
        const weatherContainer = view.getWeatherContainer();
        const slider = view.createSliderContainer();
        const cardsContainer = view.createCardsContainer();
        const [leftButton, rightButton] = view.createButtons();
        view.appendChildren(slider, [leftButton, cardsContainer, rightButton]);
        view.appendChildren(weatherContainer, [slider]);
        currentCards = view.createForecastCards(forecast);
        view.putItemsInCardsContainer(cardsContainer, currentCards);
        view.appendChildren(weatherContainer, [view.createDayDetails(forecast[0], current.time.getHours())]);
        for(let i=0; i<forecast.length; i++){
            currentCards[i].addEventListener('click', () => {
                view.clearDayDetails();
                view.appendChildren(weatherContainer, [view.createDayDetails(forecast[i], current.time.getHours())]);
            })
        }
        window.addEventListener('resize', () => {
            view.translateItems(cardsContainer, currentCards);
        })
    }

    const getWeatherData = (city) => {

        Promise.all([model.getCurrentWeather(city), model.getForecast(city), model.getHistory(city)])
        .then((data) => {
            displayWeatherData(data[0],data[1]);
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
        });
        searchInput.addEventListener("change", () => {
            entered = false;
        });
    }
    return { start }
})()


controller.start();

export default controller;