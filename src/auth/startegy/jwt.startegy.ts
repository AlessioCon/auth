import { Strategy } from "passport-jwt";
import { PassportStrategy} from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Cookie } from "src/custom_modules/cookie";

let fromAuthHeaderFastfy = (context : any) => {
    return Cookie.getCookie(context.headers.cookie, 'session');
}


@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){

    constructor() {
        super({
          jwtFromRequest: fromAuthHeaderFastfy,
          ignoreExpiration: true,
          secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    async validate( payload: any) {
        return payload
    }        
}