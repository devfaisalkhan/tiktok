import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  const configSvc = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true, 
    whitelist: true,

  }));

  await app.listen(configSvc.get<string>('PORT'));
}
bootstrap();
