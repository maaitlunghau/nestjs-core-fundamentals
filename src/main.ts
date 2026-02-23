import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// root file: entry point of ur nestjs application

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global settings
  // env

  // starts a HTTP server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();