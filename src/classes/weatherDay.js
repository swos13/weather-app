import Location from "./location"

class WeatherDay {

    hours = [];

    constructor(city, country, date, minTempC, maxTempC, minTempF, maxTempF, avgTempC, avgTempF, avgHumidity, maxWind, hours){
        this.location = new Location(city, country);
        this.date = new Date(date);
        this.minTempC = minTempC;
        this.maxTempC = maxTempC;
        this.minTempF = minTempF;
        this.maxTempF = maxTempF;
        this.avgTempC = avgTempC;
        this.avgTempF = avgTempF;
        this.avgHumidity = avgHumidity;
        this.maxWind = maxWind;
        for(let i=0; i<24; i++)
            this.hours.push(hours[i]);
    }
}

export default WeatherDay;