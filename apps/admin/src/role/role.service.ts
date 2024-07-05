import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { ApiException } from '@app/common/http-exception/api.exception';
import { ErrorCodeEnum } from '@app/common/enums/errorCodeEnum';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly permissionService: PermissionService,
    private readonly menuService: MenuService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    role.name = createRoleDto.name;
    role.description = createRoleDto.description;
    role.permissions = await this.permissionService.findAllByIds(
      createRoleDto.permissions,
    );
    role.menus = await this.menuService.findAllByIds(createRoleDto.menus);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({ relations: ['permissions', 'menus'] });
  }

  findOneById(id: number) {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'menus'],
    });
  }

  findAllByIds(ids: number[]) {
    return this.roleRepository.find({
      where: { id: In(ids) },
      relations: ['permissions', 'menus'],
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOneById(id);
    if (!role) {
      throw new ApiException(ErrorCodeEnum.ROLE_NOT_EXISTED);
    }
    role.permissions = await this.permissionService.findAllByIds(
      updateRoleDto.permissions,
    );
    role.menus = await this.menuService.findAllByIds(updateRoleDto.menus);
    role.description = updateRoleDto.description;
    role.name = updateRoleDto.name;
    return await this.roleRepository.save(role);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
