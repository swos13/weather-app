import Weather from "./classes/weather";
import weatherAPI from "./weatherAPI"

const model = (() => {

    const setUp = () => {
        weatherAPI.setKey();
    }

    const getWeatherData = (object) => {
        const {condition: {text}, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day} = object;
        return [text, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day];
    }
    
    const getCurrentWeatherData = (object) => {
        const {name, country} = object.location;
        const {last_updated} = object.current;
        const weather = getWeatherData(object.current);
        return new Weather (name, country, last_updated, ...weather)
    }

    const getCurrentWeather = async (city) => getCurrentWeatherData(await weatherAPI.getCurrent(city));

    const getForecast = async (city) => weatherAPI.getForecast(city);

    const getHistory = async (city) => weatherAPI.getHistory(city);

    return { setUp, getCurrentWeather, getForecast, getHistory }
})();

export default model;