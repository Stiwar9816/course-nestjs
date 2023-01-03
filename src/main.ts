import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* 
  Añadimos un validador PipeGlobal para verificar la data que estaremos
  enviando, WHITELIST: Remueve todos los campos que no esten incluidos 
  en los DTO's y agrega los campos requyeridos solamente, mientras
  FORBIDNONWHITELISTED: retorna un bad request si hay propiedades que no
  esten incluidas en los DTO's, exigiendo solamente los datos requeridos
  y evitar información demas.
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  await app.listen(3000);
}
bootstrap();
