import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// root file: entry point of ur nestjs application

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global settings
  // env
  // ...

  // validating incoming requests globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tự động loại bỏ các properties KHÔNG có trong DTO
      forbidNonWhitelisted: true, // ném ra lỗi nếu có properties THỪA
      transform: true, // tự động chuyển đổi kiểu dữ liệu từ 'string' sang 'number'
      disableErrorMessages: false // ẩn chi tiết lỗi validatation message, chỉ nên TRUE khi dùng trong môi trường prod
    })
  );

  // starts a HTTP server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();