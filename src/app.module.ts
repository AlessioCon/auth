import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { JwtGuard } from './auth/auth.guards';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

import mongooseConfig from './config/mongoConfig';


@Module({
  imports: [
    ConfigModule.forRoot(),
    
    MongooseModule.forRoot( mongooseConfig() , { dbName: process.env.DB_name} ),
    
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AppService
  ]
})
export class AppModule {}
