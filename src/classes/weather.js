class Weather {
    constructor(city, country, date, condition, tempC, tempF, tempFeelsC, tempFeelsF, wind, humidity, isDay){
        this.city = city;
        this.country = country;
        this.date = date;
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