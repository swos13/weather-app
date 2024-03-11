import model from "./model";
import view from "./view";
import "./style.css"

const controller = (() => {

    const getWeatherData = (city) => {

        Promise.all([model.getCurrentWeather(city), model.getForecast(city), model.getHistory(city, new Date("2024-03-07"))])
        .then((data) => {
            console.log(data);
            view.displayWeatherData(data[0],data[1]);
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