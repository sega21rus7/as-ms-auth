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
    const role = await this.rolesService.getByName('regular');
    user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAll() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async get(id: number) {
    return this.userRepository.findByPk(id, { include: { all: true } });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, include: { all: true } });
  }

  async getByLogin(login: string) {
    return this.userRepository.findOne({ where: { login }, include: { all: true } });
  }

}
