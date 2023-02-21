import { Controller, Get, Post , UseGuards, Request , Headers, Delete} from '@nestjs/common';
import { LocalGuard, JwtGuard} from './auth/allGuards';
import { AuthService } from './auth/services/auth/auth.service';
import { Public } from './custom.decorator';
import {FastifyRequest} from 'fastify'



@Controller()
export class AppController {

  constructor( private readonly authService: AuthService){}

  //login
  @Public()
  @UseGuards(LocalGuard)
  @Post('auth/login')
  async login(@Request() req){
    //ritorno token JWT
     return this.authService.login(req.user)
  }
  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  
  @Delete('auth/logout')
  logOut( 
    @Headers() header : any,
    @Request() req : FastifyRequest) {
    req.headers.access_token = null
    req.headers.authorization = null
    console.log(req.headers)
    return 'aspe'
    //this.authService.logOut(header.access_token)
  }
}
