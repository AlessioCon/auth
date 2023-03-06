"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const general_exception_1 = require("./exception/general.exception");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors({
        origin: process.env.URL_CLIENT,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new general_exception_1.GeneralException());
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT || '3080', '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map