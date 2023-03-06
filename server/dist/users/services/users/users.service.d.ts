import { UserSignInDto } from 'src/users/user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    loginByEmail(email: string): Promise<User | undefined>;
    getUserById(id: string): Promise<User | undefined>;
    create(user: UserSignInDto): Promise<{
        err: string;
        msg: string;
        success?: undefined;
    } | {
        success: boolean;
        err?: undefined;
        msg?: undefined;
    }>;
}
