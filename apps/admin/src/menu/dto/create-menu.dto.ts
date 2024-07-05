import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty({ message: '菜单名称不能为空' })
  menuName: string;

  orderNum: number;

  parentId: number;

  @IsNotEmpty({ message: '组件路径不能为空' })
  component: string;

  icon: string;

  @IsNotEmpty({ message: '菜单路径不能为空' })
  path: string;

  createBy: string;
}
