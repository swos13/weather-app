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

    const getForecastInCity = async (city, amountOfDays = 3) => {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${amountOfDays}`);
        const forecastData = await response.json();
        console.log(forecastData);
    }

    const getHistoryInCity = async (city, date = new Date()) => {
        date.setDate(date.getDate() - 1);
        console.log(date);
        const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=${key}&q=${city}&dt=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
        const historyData = await response.json();
        console.log(historyData);
    }

    const start = () => {
        setKey();
        const city = prompt("What city you want check weather?", "London");
        getForecastInCity(city);
        getHistoryInCity(city);
    }
    return { start }
})()


controller.start();