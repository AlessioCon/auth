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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guards_1 = require("../../auth.guards");
const auth_service_1 = require("../../services/auth/auth.service");
const custom_decorator_1 = require("../../../custom.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, replay) {
        var _a, _b;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.err) {
            let msg;
            switch (req.user.err) {
                case 'email':
                    msg = 'email non trovata!';
                    break;
                case 'password':
                    msg = 'la password non coincide con l\'email selezionata';
                    break;
            }
            return replay.send({ err: (_b = req.user) === null || _b === void 0 ? void 0 : _b.err, msg });
        }
        let key = await this.authService.login(req.user);
        replay.header('set-cookie', `session=${key.access_token}; Max-Age=${60 * 15}; Path=/; SameSite=Lax; ${process.env.NODE_ENV == 'production' ? 'HttpOnly; Secure' : ''}`);
        return replay.send({ success: true, rt: key.ref_token, user: req.user });
    }
    async logout(req, replay) {
        var _a;
        if (!((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id))
            return { err: true, msg: 'utente non riconosciuto per il logout' };
        await this.authService.logout(req.user._id);
        return replay.send({ success: true });
    }
    async refresh(req, replay) {
        const key = await this.authService.refresh(req.user);
        if (!key)
            throw new common_1.UnauthorizedException();
        let _a = req.user, { exp, iat } = _a, user = __rest(_a, ["exp", "iat"]);
        replay.header('set-cookie', `session=${key.access_token}; Max-Age=${60 * 15}; Path=/; SameSite=Lax; ${process.env.NODE_ENV == 'production' ? 'HttpOnly; Secure' : ''}`);
        return replay.send({ success: true, user, rt: key.ref_token });
    }
};
__decorate([
    (0, custom_decorator_1.Public)(),
    (0, common_1.UseGuards)(auth_guards_1.LocalGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map