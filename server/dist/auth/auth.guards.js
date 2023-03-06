"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = exports.LocalGuard = void 0;
const auth_guard_1 = require("@nestjs/passport/dist/auth.guard");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_service_1 = require("./services/auth/auth.service");
let LocalGuard = class LocalGuard extends (0, auth_guard_1.AuthGuard)('local') {
};
LocalGuard = __decorate([
    (0, common_1.Injectable)()
], LocalGuard);
exports.LocalGuard = LocalGuard;
let JwtGuard = class JwtGuard extends (0, auth_guard_1.AuthGuard)('jwt') {
    constructor(authService, reflector) {
        super();
        this.authService = authService;
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        var _a;
        let req = context.getRequest();
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.rf_session)
            user.rf = req.body.rf_session;
        if (Math.floor(new Date().getTime() / 1000) > user.exp) {
            if (user === null || user === void 0 ? void 0 : user.rf)
                throw err || new common_1.UnauthorizedException();
            const { iat, exp } = user, payload = __rest(user, ["iat", "exp"]);
            return payload;
        }
        return user;
    }
};
JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        core_1.Reflector])
], JwtGuard);
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=auth.guards.js.map