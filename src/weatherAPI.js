const weatherAPI = (() => {

    let key = "3cad06c4a4754e779ba104709240403";

    const setKey = () => {
        if(key === "" || key == null){
        key = prompt("What is your api key (from weatherapi.com)?");
            setKey();
        }
    }

    const getAutocomplete = async (city) => {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${city}`);
        const cities = await response.json();
        return cities;
    }

    const getCurrent = async (city) => {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
        const weatherData = await response.json();
        return weatherData;
    }

    const getForecast = async (city, amountOfDays = 3) => {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${amountOfDays}`);
        const forecastData = await response.json();
        return forecastData;
    }

    const getHistory = async (city, date) => {
        const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=${key}&q=${city}&dt=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        const historyData = await response.json();
        return historyData;
    }
    return { setKey, getAutocomplete, getCurrent, getForecast, getHistory }
})();

export default weatherAPI;