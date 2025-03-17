"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce API Documentation developed by Rodrigo Lopez Fernandez')
        .setDescription('Ecommerce')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(logger_middleware_1.loggerGlobal);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await app.listen(process.env.PORT ?? 3000, () => {
        console.log(`Server running on port ${process.env.PORT ?? 3000}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map