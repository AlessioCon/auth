"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralException = void 0;
const common_1 = require("@nestjs/common");
let GeneralException = class GeneralException {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        let resErr = exception.getResponse();
        switch (status) {
            case 400:
                return response
                    .status(200)
                    .send({
                    err: 'Tutti o alcuni dati inviati, non sono del formato richiesto',
                    statusCode: status,
                    msg: typeof resErr === 'object' ? resErr.message : resErr,
                    path: request.url,
                });
            case 401:
                return response
                    .status(200)
                    .send({
                    err: 'non autenticato',
                    statusCode: status,
                    msg: 'non sei autenticato per questa richiesta',
                    path: request.url,
                });
            default:
                return response
                    .status(200)
                    .send({
                    err: 'imprevisto',
                    statusCode: status,
                    path: request.url,
                    msg: typeof resErr === 'object' ? resErr.message : resErr,
                });
        }
    }
};
GeneralException = __decorate([
    (0, common_1.Catch)()
], GeneralException);
exports.GeneralException = GeneralException;
//# sourceMappingURL=general.exception.js.map