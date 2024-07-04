import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { ApiException } from '@app/common/http-exception/api.exception';
import { ErrorCodeEnum } from '@app/common/enums/errorCodeEnum';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.permissionRepository.findOne({
      where: { name: createPermissionDto.name },
    });
    if (permission) {
      throw new ApiException(ErrorCodeEnum.PERMISSION_Login_EXISTED);
    }
    return this.permissionRepository.save(
      this.permissionRepository.create(createPermissionDto),
    );
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOneById(id: number) {
    return this.permissionRepository.findOne({ where: { id } });
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionRepository.update(id, updatePermissionDto);
  }

  removeById(id: number) {
    return this.permissionRepository.delete(id);
  }
}
