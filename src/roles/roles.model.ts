import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./userRoles.model";

interface IRoleCreation {
  name: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreation> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}