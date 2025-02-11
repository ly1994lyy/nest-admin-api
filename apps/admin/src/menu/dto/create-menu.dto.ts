import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    description: '菜单名称',
    example: '系统管理',
  })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  menuName: string;

  @ApiProperty({
    description: '显示顺序',
    example: 1,
    required: false,
  })
  orderNum: number;

  @ApiProperty({
    description: '父菜单ID',
    example: 0,
    required: false,
  })
  parentId: number;

  @ApiProperty({
    description: '组件路径',
    example: 'system/menu/index',
  })
  @IsNotEmpty({ message: '组件路径不能为空' })
  component: string;

  @ApiProperty({
    description: '菜单图标',
    example: 'setting',
    required: false,
  })
  icon: string;

  @ApiProperty({
    description: '路由地址',
    example: '/system/menu',
  })
  @IsNotEmpty({ message: '菜单路径不能为空' })
  path: string;

  @ApiProperty({
    description: '创建者',
    example: 'admin',
    required: false,
  })
  createBy: string;
}
