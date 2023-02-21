import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UserController } from './controller/users/user.controller';


@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController]
})
export class UsersModule {}
