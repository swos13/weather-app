const controller = (() => {

    let key = "";

    const setKey = () => {
        key = prompt("What is your api key?");
    }

    const getWeatherInCity = async (city) => {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
        const weatherData = await response.json();
        console.log(weatherData);
    }

    const start = () => {
        setKey();
        const city = prompt("What city you want check weather?", "London");
        getWeatherInCity(city);
    }
    return { start }
})()


controller.start();