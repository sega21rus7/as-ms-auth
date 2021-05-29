import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    this.initialize();
  }

  private async initialize() {
    const count = await this.roleRepository.count();
    console.log('Инициализация таблицы ролей БД начальными значениями');
    if (count) {
      console.log('Таблица ролей БД уже инициализирована');
      return;
    }
    Promise.all([
      this.create({ name: 'regular' }),
      this.create({ name: 'admin' }),
      this.create({ name: 'moderator' }),
    ])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(
          'Не удалось инициализировать таблицу ролей БД начальными значениями\n',
          err,
        );
        process.exit(1);
      });
  }

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
