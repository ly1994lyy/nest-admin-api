import { NestFactory, Reflector } from '@nestjs/core';
import { AdminModule } from './admin.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from '@app/common/transform/transform.interceptor';
import { ValidatePipe } from '@app/common/validate/validate.pipe';
import { HttpExceptionFilter } from '@app/common/http-exception/http-exception.filter';
import { JwtGuard } from './auth/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors();
  app.useGlobalPipes(new ValidatePipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalGuards(new JwtGuard(new Reflector()));
  const options = new DocumentBuilder()
    .setTitle('基于Nestjs的一个通用后台管理系统接口api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env['PORT']);
}
bootstrap();
