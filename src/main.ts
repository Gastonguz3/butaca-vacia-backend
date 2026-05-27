import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(ENV.port);
  logger.log(`App is running on port ${ENV.port}`);
}
main().catch((error) => {
  Logger.error('Error starting server', error);
  process.exit(1);
});
