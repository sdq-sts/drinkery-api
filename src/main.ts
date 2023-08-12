import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import { API_PREFIX, IS_PRODUCTION } from './constants';
import { LogLevel, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const validationPipe = new ValidationPipe({
    whitelist: true,
    skipMissingProperties: true,
    forbidNonWhitelisted: true,
  });
  const logLevel: LogLevel[] = IS_PRODUCTION
    ? ['error', 'warn']
    : ['error', 'warn', 'log', 'debug'];

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logLevel,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(validationPipe);

  await app.listen(port);
}
bootstrap();
