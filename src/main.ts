import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');
  await app.listen(port);

  await Logger.warn("==============================")
  await Logger.log(`Server running on ${await app.getUrl()}`, 'Bootstrap');
  await Logger.warn("==============================")
}
bootstrap();
