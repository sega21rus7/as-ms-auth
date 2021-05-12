import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/userRoles.model";

interface IUserCreation {
  email: string;
  password: string;
  login: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreation> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}