import Weather from "./classes/weather";
import WeatherWithLocation from "./classes/weatherWithLocation";
import WeatherDay from "./classes/weatherDay";
import weatherAPI from "./weatherAPI"

const model = (() => {

    const setUp = () => {
        weatherAPI.setKey();
    }

    const getWeatherData = (object) => {
        const {condition: {text}, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day} = object;
        return [text, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day];
    }
    
    const getCurrentWeatherData = (location, weatherData) => {
        const {name, country} = location;
        const {last_updated} = weatherData;
        const weather = getWeatherData(weatherData);
        return new WeatherWithLocation(name, country, last_updated, ...weather)
    }

    const getForecastWeatherData = (weatherData) => {
        const {time} = weatherData;
        const weather = getWeatherData(weatherData);
        return new Weather(time, ...weather)
    }

    const getCurrentWeather = async (city) => {
        const data = await weatherAPI.getCurrent(city);
        return getCurrentWeatherData(data.location, data.current);
    }
    
    const getForecast = async (city) => {
        const data = await weatherAPI.getForecast(city);
        const {location, forecast: {forecastday}} = data;
        const days = [];
        forecastday.forEach((day) => {
            const hours = [];
            day.hour.forEach((hour) => {
                hours.push(getForecastWeatherData(hour));
            })
            const summary = day.day;
            days.push(new WeatherDay(location.name, location.country, day.date, summary.mintemp_c, summary.maxtemp_c, summary.mintemp_f, summary.maxtemp_f, summary.avgtemp_c, summary.avgtemp_f, hours));
        });
        return days;
    }

    const getHistory = async (city) => weatherAPI.getHistory(city);

    return { setUp, getCurrentWeather, getForecast, getHistory }
})();

export default model;