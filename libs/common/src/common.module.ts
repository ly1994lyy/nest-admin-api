import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@app/db';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
