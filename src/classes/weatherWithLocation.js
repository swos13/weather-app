import Weather from "./weather"
import Location from "./location"

class WeatherWithLocation extends Weather {
    constructor(city, country, date, iconUrl, conditionText, tempC, tempF, tempFeelsC, tempFeelsF, wind, humidity, isDay){
        super(date, iconUrl, conditionText, tempC, tempF, tempFeelsC, tempFeelsF, wind, humidity, isDay);
        this.location = new Location(city, country);
    }
}

export default WeatherWithLocation;