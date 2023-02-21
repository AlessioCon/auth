import { Controller, Get, Inject, Ip } from '@nestjs/common';
import { WeatherService } from 'src/weather/services/weather/weather.service';


@Controller('weather')
export class WeatherController{
    constructor(private weatherService : WeatherService){}

    @Get('')
    getWeather(@Ip() ip: string){
        let date = this.weatherService.getWeather(ip)
        
        if(date) return date
        else return 'errore al server'
    }
}