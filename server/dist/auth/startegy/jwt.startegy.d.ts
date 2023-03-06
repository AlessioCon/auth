import { Strategy } from "passport-jwt";
declare const JwtStartegy_base: new (...args: any[]) => Strategy;
export declare class JwtStartegy extends JwtStartegy_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
