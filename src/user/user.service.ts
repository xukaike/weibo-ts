import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Crypto } from '../common/utils/crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    user_name: string,
    password: string,
    gender: number,
  ): Promise<User> {
    const user = this.userRepository.create({
      user_name,
      password: Crypto.md5(password),
      gender,
      nick_name: user_name,
    });
    return this.userRepository.save(user);
  }

  async changeInfo(
    user: User,
    user_name: string,
    nick_name: string,
    city: string,
    avatar: string,
    gender: number,
  ): Promise<User> {
    user.nick_name = nick_name;
    user.user_name = user_name;
    user.city = city;
    user.avatar = avatar;
    user.gender = gender;
    return this.userRepository.save(user);
  }

  async changePassword(user: User, password: string): Promise<User> {
    user.password = Crypto.md5(password);
    return this.userRepository.save(user);
  }

  async getUserInfo(user_name: string, password: string | null): Promise<User> {
    let user;
    if (password) {
      user = await this.userRepository.findOne({
        user_name,
        password: Crypto.md5(password),
      });
    } else {
      user = await this.userRepository.findOne({ user_name });
    }
    return user;
  }
}
