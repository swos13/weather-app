import weatherAPI from "./weatherAPI";
import model from "./model";

const controller = (() => {


    const start = () => {
        weatherAPI.setKey();
        const city = prompt("What city you want check weather?", "London");
        model.getCurrentWeather(city).then((r) => console.log(r));
    }
    return { start }
})()


controller.start();