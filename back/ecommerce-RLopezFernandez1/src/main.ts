import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSwagger = new DocumentBuilder()
    .setTitle('Ecommerce API Documentation developed by Rodrigo Lopez Fernandez') 
    .setDescription('Ecommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api', app, document);

  app.use(loggerGlobal);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server running on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
