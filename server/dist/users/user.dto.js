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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignInDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UserNameDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(24),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.Matches)(/^[A-Za-z]+$/),
    __metadata("design:type", String)
], UserNameDto.prototype, "f", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(24),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.Matches)(/^[A-Za-z]+$/),
    __metadata("design:type", String)
], UserNameDto.prototype, "l", void 0);
class UserSignInDto {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UserNameDto),
    (0, class_validator_1.IsNotEmptyObject)(),
    __metadata("design:type", UserNameDto)
], UserSignInDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(24),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], UserSignInDto.prototype, "usn", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(32),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], UserSignInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], UserSignInDto.prototype, "pas", void 0);
exports.UserSignInDto = UserSignInDto;
//# sourceMappingURL=user.dto.js.map