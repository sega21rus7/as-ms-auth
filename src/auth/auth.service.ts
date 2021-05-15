import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/users.model';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async login(dto: CreateUserDto) {
    let user = dto.email && await this.usersService.getByEmail(dto.email);
    if (!user && dto.login) {
      user = await this.usersService.getByLogin(dto.login);
    }
    if (!user) {
      throw new RpcException('Пользователь с данным email/логином не зарегистрирован');
    }
    const passEquals = await bcrypt.compare(dto.password, user.password);
    if (!passEquals) {
      throw new RpcException('Неверный email/логин или пароль');
    }
    return this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    let candidate = await this.usersService.getByEmail(dto.email);
    if (candidate) {
      throw new RpcException("Пользователь с таким email уже существует");
    }
    candidate = await this.usersService.getByLogin(dto.login);
    if (candidate) {
      throw new RpcException("Пользователь с таким логином уже существует");
    }
    const salt = bcrypt.genSalt(+this.configService.get<string>('BCRYPT_SALT'));
    const encodedPassword = await bcrypt.hash(dto.password, +salt);
    const user = await this.usersService.create({ ...dto, password: encodedPassword });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      login: user.login,
      id: user.id,
      roles: user.roles,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
