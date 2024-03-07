class WeatherDay {

    hours = new Map();

    constructor(hours){
        for(let i=0; i<24; i++)
            this.hours.set(i, hours[i]);
    }
}

export default WeatherDay;