import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth/auth.service';

import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule  } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './schemas/authUser.schema';
import { LocalStrategy } from './startegy/local.strategy';
import { JwtStartegy } from './startegy/jwt.startegy';
import { AuthController } from './controller/auth/auth.controller';

import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwtConfig';




@Module({
  imports: [
    UsersModule, 
    PassportModule,
    MongooseModule.forFeature([{ name: AuthUser.name, schema: AuthUserSchema }]),
    ConfigModule.forFeature( jwtConfig ),
    JwtModule.registerAsync( jwtConfig.asProvider() ),
  ],
  providers:[AuthService, LocalStrategy, JwtStartegy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
