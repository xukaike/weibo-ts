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

  @Index()
  @Column({
    comment: '用户名',
  })
  user_name: string;

  @Index()
  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'tinyint',
    comment: '昵称',
  })
  nick_name: string;

  @Column({
    unsigned: true,
    default: 2,
    comment: '性别 0:女,1:男,2:其他',
  })
  gender: number;

  @Column({
    nullable: true,
    comment: '城市',
  })
  city: number;

  @Column({
    nullable: true,
    comment: '头像',
  })
  avatar: number;

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
