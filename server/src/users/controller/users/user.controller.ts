import { Controller, Get, Req , Post, Body} from '@nestjs/common';
import { Public } from 'src/custom.decorator';
import { UsersService } from 'src/users/services/users/users.service';
import { UserSignInDto } from 'src/users/user.dto';


@Controller('user')
export class UserController {


    constructor(private readonly userService : UsersService){}

    @Get('profile')
    async getUser(
        @Req() req
    ){
        let user = await this.userService.getUserById(req.user._id);
        if(user){
            return { success: true ,user}
        }else{
            return {err: 'user undefiend'}
        }
      
    }

    @Public()
    @Post('sign')
    async createUser(@Body() user: UserSignInDto){
        
        let resp = await this.userService.create(user)
        return resp
    }

}
