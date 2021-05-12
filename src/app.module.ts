import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
