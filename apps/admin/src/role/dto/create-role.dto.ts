import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  description: string;
  permissions: number[];
  menus: number[];
}
