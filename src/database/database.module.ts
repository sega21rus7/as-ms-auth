import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { User } from 'src/users/users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/userRoles.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: +configService.get<string>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
          models: [User, Role, UserRoles],
          autoLoadModels: true,
        };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule { }
