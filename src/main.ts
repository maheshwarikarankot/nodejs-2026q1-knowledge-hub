import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ── Global Validation Pipe ──
  // Validates all request bodies using DTO class-validator decorators
  app.useGlobalPipes(new ValidationPipe({
    whitelist            : true,  // strip unknown properties
    forbidNonWhitelisted : false,
    transform            : true,  // auto-transform types
  }));
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();