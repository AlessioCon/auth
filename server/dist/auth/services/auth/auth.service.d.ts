import { UsersService } from 'src/users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AuthUserDocument } from 'src/auth/schemas/authUser.schema';
export declare class AuthService {
    private jwtService;
    private userService;
    private readonly authUserModel;
    constructor(jwtService: JwtService, userService: UsersService, authUserModel: Model<AuthUserDocument>);
    validateUser(email: string, password: string): Promise<any>;
    login(user: {
        usn: string;
        _id: string;
        email: string;
    }): Promise<{
        access_token: string;
        ref_token: string;
    }>;
    logout(idUser: string): Promise<boolean>;
    refresh(user: {
        usn: string;
        _id: string;
        email: string;
        rf: string;
        iat: number;
        exp: number;
    }): Promise<{
        access_token: string;
        ref_token: string;
    } | false>;
}
