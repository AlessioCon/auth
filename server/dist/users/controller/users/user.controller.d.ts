import { UsersService } from 'src/users/services/users/users.service';
import { UserSignInDto } from 'src/users/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    getUser(req: any): Promise<{
        success: boolean;
        user: import("../../schemas/user.schema").User;
        err?: undefined;
    } | {
        err: string;
        success?: undefined;
        user?: undefined;
    }>;
    createUser(user: UserSignInDto): Promise<{
        err: string;
        msg: string;
        success?: undefined;
    } | {
        success: boolean;
        err?: undefined;
        msg?: undefined;
    }>;
}
