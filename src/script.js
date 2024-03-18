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
        view.slideRight(cards);
        /*
        Add eventlisteners for buttons, a click should add another card and then translate everything
        Card maybe should be in the map - each one having a translateX value as key - only show the ones with 0, x and 2x translations (might be already done with overflow: hidden)
        on each click check if date doesnt exceed max or min (2 days ahead and unntil 1st Jan of 2010)
        */
        leftButton.addEventListener('click', () => {
            const previousDate = model.allData[0].date;
            previousDate.setDate(previousDate.getDate() - 1);
            model.getHistory(city, previousDate).then((data) => {
                model.allData.unshift(data);
                const newCard = view.createForecastWeatherCard(data);
                cards.unshift(newCard);
                const translationValue = -view.getTranslation();
                view.translateCard(newCard, translationValue);
                cardsContainer.insertBefore(newCard, cardsContainer.firstChild);
                view.slideRight(cards);
            })
            
        })

        window.addEventListener('resize', () => {
            view.slideRight(cards);
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
        });
        searchInput.addEventListener("change", () => {
            entered = false;
        });
    }
    return { start }
})()


controller.start();

export default controller;