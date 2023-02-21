import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    
    constructor(
        private jwtService  : JwtService,
        private userService : UsersService
    ){}

    async validateUser(email: string , password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const { password , ...result } = user;
                return result;
            }
        }
        return null
    }

    async login(user: any){
        const payload = { username: user.username, sub: user.userId };
        return {
          jwt_access: this.jwtService.sign(payload),
        };
    }


    async logOut(token : any){
      
        return this.jwtService.verify(token)
    }
}
