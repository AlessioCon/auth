import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import { FastifyRequest, FastifyReply } from 'fastify';


@Injectable()
export class LocalGuard extends AuthGuard('local'){}


@Injectable()
export class JwtGuard extends AuthGuard('jwt'){

    constructor(private reflector: Reflector) {
        super();
    }
    
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) { 
            return true;
        }
        return super.canActivate(context);
    }


    handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
        throw err || new UnauthorizedException();
    }
    return user;
    }
}

