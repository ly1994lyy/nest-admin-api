import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: '权限名称',
    example: 'create:user',
  })
  @IsNotEmpty({ message: '权限名称不能为空' })
  name: string;

  @ApiProperty({
    description: '权限描述',
    example: '创建用户的权限',
  })
  @IsNotEmpty({ message: '权限描述不能为空' })
  description: string;
}
