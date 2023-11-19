import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // remueve todo los datos extras del Dto
    forbidNonWhitelisted:true // valida que no se envien datos extras y devuelve 400 si el cliente lo envia

  }))
  await app.listen(3000);
}
bootstrap();
