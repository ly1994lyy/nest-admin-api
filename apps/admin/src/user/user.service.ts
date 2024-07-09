import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiException } from '@app/common/http-exception/api.exception';
import { ErrorCodeEnum } from '@app/common/enums/errorCodeEnum';
import { RoleService } from '../role/role.service';
import { handleMenuToTree } from '@app/common/utils/handleMenu';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
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
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['roles', 'roles.permissions', 'roles.menus'],
    });
  }

  findOne(id: bigint) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.permissions', 'roles.menus'],
    });
  }

  findUserByName(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  findByNameWithPass(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['username', 'password'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: updateUserDto.username,
      },
    });
    if (!user) {
      throw new ApiException(ErrorCodeEnum.USER_Login_Error);
    }
    user.roles = await this.roleService.findAllByIds(updateUserDto.roles);
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async getMenusById(id: bigint) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.permissions', 'roles.menus'],
    });
    if (!user) {
      throw new ApiException(ErrorCodeEnum.USER_Login_Error);
    }
    const allMenus = user.roles.reduce((result, item) => {
      return [...result, ...item.menus];
    }, []);
    return {
      menus: handleMenuToTree(allMenus),
    };
  }
}
