import Condition from './condition'

class Weather {
    constructor(time, iconUrl, conditionText, tempC, tempF, tempFeelsC, tempFeelsF, wind, humidity, isDay){
        this.time = new Date(time);
        this.condition = new Condition(iconUrl, conditionText);
        this.tempC = tempC;
        this.tempF = tempF;
        this.tempFeelsC = tempFeelsC;
        this.tempFeelsF = tempFeelsF;
        this.wind = wind;
        this.humidity = humidity;
        this.isDay = isDay;
    }
}

export default Weather;