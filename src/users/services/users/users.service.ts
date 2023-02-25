import { Injectable } from '@nestjs/common';
import { UserSignInDto } from 'src/users/user.dto';
import * as bcrypt from 'bcrypt'

// This should be a real class/interface representing a user entity
export type User = any;


@Injectable()
export class UsersService {
    private readonly users = [
        {
            _id: 1,
            usn: 'aleUser',
            pas: '$2b$10$fjaasWyvTZjuCobhwpC0eOP/W7jZpC1PO3CNXsLfkkosbvPpmocMS',
            email: 'ale@gmail.com'
        },
        {
            _id: 2,
            usn: 'mircoUser',
            pas: 'mircoUser',
            email   : 'mirco@gmail.com'
        },
        {
            _id: 3,
            usn: 'finUser',
            pas: 'finUser',
            email   : 'fin@gmail.com'
        }
    ]


    //login service
    async findByEmail(email: string) : Promise<User | undefined>{
        return this.users.find(x => x.email === email)
    }

    async create(user: UserSignInDto){

        // fare tutti i controlli del caso nel db :
            //email già in uso => email
            //stesso username  => usn

        let bcryptPass = await bcrypt.hash(user.pas, 10)
        let createUser = {pass: bcryptPass , ...user}

        return createUser
    }


}


