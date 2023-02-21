import { Injectable } from '@nestjs/common';
import { UserSignInDto } from 'src/users/user.dto';
import * as bcrypt from 'bcrypt'

// This should be a real class/interface representing a user entity
export type User = any;


@Injectable()
export class UsersService {
    private readonly users = [
        {
            id: 1,
            username: 'aleUser',
            password: '$2b$10$fjaasWyvTZjuCobhwpC0eOP/W7jZpC1PO3CNXsLfkkosbvPpmocMS',
            email   : 'ale@gmail.com'
        },
        {
            id: 2,
            username: 'mircoUser',
            password: 'mircoUser',
            email   : 'mirco@gmail.com'
        },
        {
            id: 3,
            username: 'finUser',
            password: 'finUser',
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

        let bcryptPass = await bcrypt.hash(user.pass, 10)
        let createUser = {pass: bcryptPass , ...user}

        return createUser
    }


}


