/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { dmValidationPipe } from '@dm/nest/shared/util-error-handler';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(dmValidationPipe);
  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
