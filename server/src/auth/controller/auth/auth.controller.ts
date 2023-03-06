import { 
    Controller, 
    Get, Post , UseGuards, Request , Response, Headers, Delete,
    UnauthorizedException , BadRequestException} from '@nestjs/common';
import { LocalGuard} from '../../auth.guards';
import { AuthService } from '../../services/auth/auth.service';
  
import {FastifyReply} from 'fastify'
import { Public } from 'src/custom.decorator';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService : AuthService,
    ){}



    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(
        @Request() req ,
        @Response() replay: FastifyReply)
    {  
        //ritorno token JWT
        if(req.user?.err){
          let msg: string;
          switch(req.user.err){
            case 'email':
              msg = 'email non trovata!'
              break
            case 'password':
              msg = 'la password non coincide con l\'email selezionata'
              break
          }
          return replay.send({err: req.user?.err , msg}) 
        }
        
        let key = await this.authService.login(req.user)
    
        replay.header('set-cookie', `session=${key.access_token}; Max-Age=${60*15}; Path=/; SameSite=Lax; ${process.env.NODE_ENV == 'production' ? 'HttpOnly; Secure' : ''}`)

        return replay.send({success: true, rt: key.ref_token , user: req.user}) 
    }

    @Get('logout')
    async logout( 
      @Request() req,
      @Response() replay : FastifyReply
    ) {
  
      if(!req?.user?._id) return {err: true , msg: 'utente non riconosciuto per il logout'}
        
      await this.authService.logout(req.user._id)
      return replay.send({success: true})
    }


    @Post('refresh')
    async refresh(
      @Request() req ,
      @Response() replay: FastifyReply){
        

      const key = await  this.authService.refresh(req.user);

      if(!key) throw new UnauthorizedException();
  
      let {exp, iat, ...user} = req.user


      replay.header('set-cookie', `session=${key.access_token}; Max-Age=${60*15}; Path=/; SameSite=Lax; ${process.env.NODE_ENV == 'production' ? 'HttpOnly; Secure' : ''}`)
      return replay.send({success: true, user , rt: key.ref_token}) 
    }
}
