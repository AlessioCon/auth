import { 
  Controller, 
  Get, Request} from '@nestjs/common';

@Controller()
export class AppController {

  

  @Get('profile')
  getProfile(@Request() req : any) {

    return req.user;
  }


}
