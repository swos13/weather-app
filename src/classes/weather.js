class Weather {
    constructor(time, condition, tempC, tempF, tempFeelsC, tempFeelsF, wind, humidity, isDay){
        this.time = time;
        this.condition = condition;
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