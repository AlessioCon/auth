"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => {
    return {
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: 60 * 15 },
    };
});
//# sourceMappingURL=jwtConfig.js.map