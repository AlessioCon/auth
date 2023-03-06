import { Injectable } from '@nestjs/common';
import { UserSignInDto } from 'src/users/user.dto';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model} from 'mongoose';

// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ){}
    

    async loginByEmail(email: string) : Promise<User | undefined>{
        email = email.toLowerCase()
        let user = await this.userModel.findOne({email: email}).select('_id usn email pas')
        return user ? user : undefined
    }

    async getUserById(id: string) : Promise<User | undefined>{
        let user = await this.userModel.findById({_id: id})
        return user ? user : undefined
    }

    async create(user: UserSignInDto){

        let userDb = await this.userModel.findOne({$or:[{email: user.email}, {usn: user.usn}]})
        if(userDb){
           
            if(userDb.email === user.email){ return {err: 'sign_email' , msg:'email già in uso'}}
            else{ return {err: 'user' , msg:'username già in uso'}}
        }
        user.email = user.email.toLowerCase()

        let bcryptPass = await bcrypt.hash(user.pas, 10)
        let createUser = new this.userModel({...user, pas: bcryptPass})

        await createUser.save()
        return {success: true}
    }
}


