import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { ApiException } from '@app/common/http-exception/api.exception';
import { ErrorCodeEnum } from '@app/common/enums/errorCodeEnum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly permissionService: PermissionService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    role.name = createRoleDto.name;
    role.description = createRoleDto.description;
    role.permissions = await this.permissionService.findAllByIds(
      createRoleDto.permissions,
    );
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  findOneById(id: number) {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  findAllByIds(ids: number[]) {
    return this.roleRepository.find({
      where: { id: In(ids) },
      relations: ['permissions'],
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
    role.description = updateRoleDto.description;
    role.name = updateRoleDto.name;
    return await this.roleRepository.save(role);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
