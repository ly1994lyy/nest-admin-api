import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: '角色名称',
    example: 'admin',
  })
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @ApiProperty({
    description: '角色描述',
    example: '管理员角色',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: '权限ID列表',
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  permissions: number[];

  @ApiProperty({
    description: '菜单ID列表',
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  menus: number[];
}
