import model from "./model";
import "./style.css"

const controller = (() => {


    const start = () => {
        model.setUp();
        const city = prompt("What city you want check weather?", "London");
        model.getCurrentWeather(city).then((r) => console.log(r));
        model.getForecast(city).then((r) => console.log(r));
        model.getHistory(city).then((r) => console.log(r));
    }
    return { start }
})()


controller.start();