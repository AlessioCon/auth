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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../../users/services/users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const authUser_schema_1 = require("../../schemas/authUser.schema");
let AuthService = class AuthService {
    constructor(jwtService, userService, authUserModel) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.authUserModel = authUserModel;
    }
    async validateUser(email, password) {
        const user = await this.userService.loginByEmail(email);
        if (!user)
            return { err: 'email' };
        const isMatch = await bcrypt.compare(password, user.pas);
        if (isMatch) {
            const { pas, email, _id, usn } = user;
            return { email, _id, usn };
        }
        return { err: 'password' };
    }
    async login(user) {
        const jwt = this.jwtService.sign(user);
        let refToken = await bcrypt.hash(jwt + user._id, 10);
        await this.authUserModel.findOneAndDelete({ id: user._id });
        let newSession = new this.authUserModel({
            _id: user._id,
            rf: refToken,
        });
        await newSession.save();
        return {
            access_token: jwt,
            ref_token: refToken
        };
    }
    async logout(idUser) {
        let id = new mongoose_1.Types.ObjectId(idUser);
        await this.authUserModel.findByIdAndDelete(id);
        return true;
    }
    async refresh(user) {
        let userDb = await this.authUserModel.findById(new mongoose_1.Types.ObjectId(user._id));
        if (!userDb)
            return false;
        if (userDb.rf !== user.rf) {
            await userDb.delete();
            return false;
        }
        const { rf, iat, exp } = user, jwtUser = __rest(user, ["rf", "iat", "exp"]);
        const jwt = this.jwtService.sign(jwtUser);
        let refToken = await bcrypt.hash(jwt + user._id, 10);
        userDb.rf = refToken;
        await userDb.save();
        return {
            access_token: jwt,
            ref_token: refToken
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)(authUser_schema_1.AuthUser.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map