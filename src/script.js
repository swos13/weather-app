import weatherAPI from "./weatherAPI";

const controller = (() => {


    const start = () => {
        weatherAPI.setKey();
        const city = prompt("What city you want check weather?", "London");
        weatherAPI.getCurrent(city).then((response) => console.log(response));
        weatherAPI.getForecast(city).then((response) => console.log(response));
        weatherAPI.getHistory(city).then((response) => console.log(response));
    }
    return { start }
})()


controller.start();