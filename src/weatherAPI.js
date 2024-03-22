const weatherAPI = (() => {

    let key = "3cad06c4a4754e779ba104709240403";

    const setKey = () => {
        if(key === "" || key == null){
        key = prompt("What is your api key (from weatherapi.com)?");
            setKey();
        }
    }

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    }

    const getAutocomplete = async (city) => {
        const cities = await fetchData(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${city}`);
        return cities;
    }

    const getCurrent = async (city) => {
        const weatherData = await fetchData(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
        return weatherData;
    }

    const getForecast = async (city, amountOfDays = 3) => {
        const forecastData = await fetchData(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${amountOfDays}`);
        return forecastData;
    }

    const getHistory = async (city, date) => {
        const historyData = await fetchData(`https://api.weatherapi.com/v1/history.json?key=${key}&q=${city}&dt=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
        return historyData;
    }
    
    return { setKey, getAutocomplete, getCurrent, getForecast, getHistory }
})();

export default weatherAPI;