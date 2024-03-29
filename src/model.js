import Weather from "./classes/weather";
import WeatherWithLocation from "./classes/weatherWithLocation";
import WeatherDay from "./classes/weatherDay";
import weatherAPI from "./weatherAPI"

const model = (() => {

    const allData = [];

    const setUp = () => {
        weatherAPI.setKey();
    }

    const getAutocomplete = (city) => {
        const cities = weatherAPI.getAutocomplete(city);
        return cities;
    }

    const getWeatherData = (object) => {
        const {condition: {icon, text}, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day} = object;
        return [icon, text, temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, humidity, is_day];
    }
    
    const getCurrentWeatherData = (location, weatherData) => {
        const {name, region, country} = location;
        const {last_updated} = weatherData;
        const weather = getWeatherData(weatherData);
        return new WeatherWithLocation(name, region, country, last_updated, ...weather)
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

    const getWeatherDay = (day, location) => {
        const hours = [];
            day.hour.forEach((hour) => {
                hours.push(getForecastWeatherData(hour));
            })
            const summary = day.day;
        return new WeatherDay(location.name, location.region, location.country, day.date, summary.mintemp_c, summary.maxtemp_c, summary.mintemp_f, summary.maxtemp_f, summary.avgtemp_c, summary.avgtemp_f, summary.avghumidity, summary.maxwind_kph, hours)
    }
    
    const getForecast = async (city) => {
        const data = await weatherAPI.getForecast(city);
        const {location, forecast: {forecastday}} = data;
        const days = [];
        forecastday.forEach((day) => {
            days.push(getWeatherDay(day, location));
        });
        return days;
    }

    const getHistory = async (city, date = null) => {
        if(date == null){
            date = new Date();
            date.setDate(date.getDate() - 1);
        }
        const data = await weatherAPI.getHistory(city, date);
        const {location, forecast: {forecastday}} = data;
        return getWeatherDay(forecastday[0], location);
    }

    const isDataAvailable = (date) => {
        const today = new Date();
        today.setMinutes = 0;
        today.setHours = 0;
        if(date >= (new Date).setDate(today.getDate() - 9) && date < (new Date).setDate(today.getDate() + 2))
            return true;
        return false;
    }

    return { allData, setUp, getAutocomplete, getCurrentWeather, getForecast, getHistory, isDataAvailable }
})();

export default model;