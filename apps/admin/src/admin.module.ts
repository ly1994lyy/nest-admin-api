import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CommonModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [CommonModule, AuthModule, UserModule, RoleModule, PermissionModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
