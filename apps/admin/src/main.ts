import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  const options = new DocumentBuilder()
    .setTitle('基于Nestjs的一个通用后台管理系统接口api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env['PORT']);
}
bootstrap();
