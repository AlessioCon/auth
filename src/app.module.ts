import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { AuthModule } from './auth/auth.module';

import { JwtGuard } from './auth/allGuards';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    WeatherModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AppService],
})
export class AppModule {}
