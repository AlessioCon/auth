import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './services/auth/auth.service';


@Injectable()
export class LocalGuard extends AuthGuard('local'){}


@Injectable()
export class JwtGuard extends AuthGuard('jwt'){

    constructor(
        private readonly authService: AuthService,
        private reflector: Reflector) {
        super();
    }
    
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) { return true }
        return super.canActivate(context);
    }


    handleRequest(err, user, info, context) {
       
        let req = context.getRequest();

        if (err || !user) { throw err || new UnauthorizedException();}
     
        if(req.body?.rf_session)  user.rf = req.body.rf_session
        if(Math.floor(new Date().getTime() / 1000) > user.exp){ 
            if(user?.rf) throw err || new UnauthorizedException();
            const {iat, exp , ...payload} = user;
            return payload
        }

        return user;
    }
}

