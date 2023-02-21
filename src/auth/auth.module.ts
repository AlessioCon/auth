import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth/auth.service';

import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './startegy/local.strategy';
import { JwtStartegy } from './startegy/jwt.startegy';
import { JwtModule  } from '@nestjs/jwt';
import { JwtGuard } from './allGuards';




@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({useFactory: async () => ({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: 60 * 60 * 24},
      }),     
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStartegy],
  exports: [AuthService]
})
export class AuthModule {}
