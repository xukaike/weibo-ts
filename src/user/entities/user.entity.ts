import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Index('unique_user_name', { unique: true })
  @Column({
    comment: '用户名',
  })
  user_name: string;

  @Index('index_password')
  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '昵称',
  })
  nick_name: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 2,
    comment: '性别 0:女,1:男,2:其他',
  })
  gender: number;

  @Column({
    nullable: true,
    comment: '城市',
  })
  city: string;

  @Column({
    nullable: true,
    comment: '头像',
  })
  avatar: string;

  @CreateDateColumn({
    nullable: true,
    comment: '创建时间',
  })
  created_at: string;

  @UpdateDateColumn({
    nullable: true,
    comment: '更新时间',
  })
  updated_at: string;
}