import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { GeneralException } from './exception/general.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableCors({
    origin: process.env.URL_CLIENT,
    credentials: true,    
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new GeneralException())
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT || '3080', '0.0.0.0');
}
bootstrap();
