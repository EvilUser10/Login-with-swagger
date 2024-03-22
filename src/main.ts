import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { createMap } from '@automapper/core';
// import { mapper } from './mappings/mapper.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // createMap(mapper, User, UserDto)
  await app.listen(3000);
}
bootstrap();
