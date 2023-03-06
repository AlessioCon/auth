import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './services/auth/auth.service';
declare const LocalGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport/dist/auth.guard").IAuthGuard>;
export declare class LocalGuard extends LocalGuard_base {
}
declare const JwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport/dist/auth.guard").IAuthGuard>;
export declare class JwtGuard extends JwtGuard_base {
    private readonly authService;
    private reflector;
    constructor(authService: AuthService, reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest(err: any, user: any, info: any, context: any): any;
}
export {};
