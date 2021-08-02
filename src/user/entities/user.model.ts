import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
  comment: '用户表',
  indexes: [
    {
      name: 'unique_user_name',
      unique: true,
      fields: ['user_name'],
    },
    {
      name: 'idx_password',
      unique: false,
      fields: ['password'],
    },
  ],
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '用户名',
  })
  user_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '昵称',
    allowNull: false,
    type: DataType.STRING,
  })
  nick_name: string;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 2,
    allowNull: false,
    comment: '性别 0:女,1:男,2:其他',
  })
  gender: number;

  @Column({
    type: DataType.STRING,
    comment: '城市',
  })
  city: string;

  @Column({
    type: DataType.STRING,
    comment: '头像',
  })
  avatar: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
