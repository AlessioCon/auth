import { AuthService } from '../../services/auth/auth.service';
import { FastifyReply } from 'fastify';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, replay: FastifyReply): Promise<never>;
    logout(req: any, replay: FastifyReply): Promise<{
        err: boolean;
        msg: string;
    }>;
    refresh(req: any, replay: FastifyReply): Promise<never>;
}
