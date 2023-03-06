import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable , UnauthorizedException } from "@nestjs/common"
import { AuthService } from "../services/auth/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService : AuthService){ 
        super({usernameField: 'email'}) 
    }
    
    
    async validate(email: string , password: string) : Promise<any>{
        const user : { id: string , username: string , err?: string} = await this.authService.validateUser(email , password);
        switch(user.err){
            case 'email':
                //email inesistente
                return {err: 'email'}
            case 'password':
                //password error
                return {err: 'password'}
            default:
                return user
        }
    }
}