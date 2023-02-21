import { Module, Injectable } from '@nestjs/common';
import { WeatherController } from './controllers/weather/weather.controller';
import { WeatherService } from './services/weather/weather.service';


@Module({
    controllers: [WeatherController],
    providers: [WeatherService],
})
export class WeatherModule {}
