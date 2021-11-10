import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    logger: true // todo place holder to have the logger actually use the log level defined in configurations
  });

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);

  Logger.debug(`IV app started on port: ${port}`);
  Logger.debug(`IV app started with log level: ${configService.get('logLevel')}`);
  Logger.debug(`IV app pointed at UnumID SaaS url: ${configService.get('saasUrl')}`);
}
bootstrap();
