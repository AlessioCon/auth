import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {


    getWeather(ip: string) : string {
    
        return  'geoip.lookup(ip)'
    }
}
