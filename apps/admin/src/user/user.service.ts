import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiException } from '@app/common/http-exception/api.exception';
import { ErrorCodeEnum } from '@app/common/enums/errorCodeEnum';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.user.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (user) {
      throw new ApiException(ErrorCodeEnum.USER_EXISTED);
    }
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.password = createUserDto.password;
    newUser.avatar = createUserDto.avatar;
    newUser.roles = await this.roleService.findAllByIds(createUserDto.roles);
    return this.user.save(newUser);
  }

  findAll() {
    return this.user.find({
      relations: ['roles', 'menus', 'roles.permissions'],
    });
  }

  findOne(id: bigint) {
    return this.user.findOne({
      where: { id },
      relations: ['roles', 'menus', 'roles.permissions'],
    });
  }

  findUserByName(username: string) {
    return this.user.findOne({
      where: { username },
    });
  }

  findByNameWithPass(username: string) {
    return this.user.findOne({
      where: { username },
      select: ['username', 'password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
