import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

  async getAll() {
    return this.roleRepository.findAll();
  }

  async create(dto: CreateRoleDto) {
    return this.roleRepository.create(dto);
  }

  async getByName(name: string) {
    return this.roleRepository.findOne({ where: { name } });
  }

  async delete(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    return role.destroy();
  }
}
