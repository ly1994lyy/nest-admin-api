import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  await app.listen(process.env['PORT']);
}
bootstrap();
