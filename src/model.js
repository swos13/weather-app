import Weather from "./classes/weather";
import weatherAPI from "./weatherAPI"

const model = (() => {

    const setUp = () => {
        weatherAPI.setKey();
    }

    const getWeatherData = (object) => {
        console.log(object);
        const {name, country} = object.location;
        const {last_updated, condition, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day} = object.current;
        return new Weather (name, country, last_updated, condition.text, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day)
    }

    const getCurrentWeather = async (city) => { 
        const current = getWeatherData(await weatherAPI.getCurrent(city));
        return current;
    }
    return { setUp, getCurrentWeather }
})();

export default model;