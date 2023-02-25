import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { InjectModel} from '@nestjs/mongoose';
import { AuthUser, AuthUserDocument } from 'src/auth/schemas/authUser.schema';


@Injectable()
export class AuthService {
    
    constructor(
        private jwtService  : JwtService,
        private userService : UsersService,
        @InjectModel(AuthUser.name) private readonly authUserModel: Model<AuthUserDocument>,
    ){}


    //usata per passaport-local
    async validateUser(email: string , password: string): Promise<any> {
        const user : {_id: string, pas: string, email: string , usn: string} | undefined = await this.userService.findByEmail(email);

        if(user){
            const isMatch = await bcrypt.compare(password, user.pas);
            if(isMatch){
                const { pas , ...result } = user;
                return result;
            }
        }
        return null
    }

    //usata per crazione token
    async login(user : {usn: string , _id: string , email: string}){
        
        const jwt = this.jwtService.sign(user);
        let refToken = await bcrypt.hash(jwt+user._id , 10);
        

        //cancella le possibili sessioni
        await this.authUserModel.findOneAndDelete({id: user._id});

        let newSession = new this.authUserModel({
            _id: user._id , 
            rf: refToken, 
        })

        await newSession.save();
    
        
        return {
          access_token: jwt,
          ref_token: refToken
        };
    }


    async logout(idUser : string) : Promise<boolean> {

        await this.authUserModel.findOneAndDelete({_id: idUser})
        return true
    }

    async refresh(user: {usn: string , _id: string , email: string , rf: string}) : Promise<{access_token: string, ref_token: string} | false> {

        let userDb = await this.authUserModel.findOne({_id: user._id});

        if(!userDb) return false;
        if(userDb.rf !== user.rf){
            //probabile copia del RT
            //magari manda un mess all'utente
            await userDb.delete();
            return false;
        }

        const jwt = this.jwtService.sign(user);
        let refToken = await bcrypt.hash(jwt+user._id , 10);

        userDb.rf = refToken;
        await userDb.save();
        
        return {
            access_token: jwt,
            ref_token: refToken
          };
    }


    
}
