import { 
  Controller, 
  Get, Request} from '@nestjs/common';
import { Public } from './custom.decorator';

@Controller()
export class AppController {

  

  @Get('profile')
  getProfile(@Request() req : any) {

    return req.user;
  }

  @Public()
  @Get('')
  apitest(@Request() req : any) {

    return 'hi word';
  }


}
