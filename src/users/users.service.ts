import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService
  ) { }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getByName('user');
    user.$set('roles', [role.id]);
    return user;
  }

  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async get(id: number) {
    const user = await this.userRepository.findByPk(id, { include: { all: true } });
    return user;
  }

}
