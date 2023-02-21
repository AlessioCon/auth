import { Controller , ValidationPipe, UsePipes} from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common/decorators';
import { Public } from 'src/custom.decorator';
import { UsersService } from 'src/users/services/users/users.service';
import { UserSignInDto } from 'src/users/user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly usersService: UsersService){}

    @Public()
    @UsePipes(ValidationPipe)
    @Post('signin')
    signIn(@Body() user: UserSignInDto){
        return this.usersService.create(user);
    }
}
