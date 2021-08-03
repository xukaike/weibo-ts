import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { Crypto } from '../common/utils/crypto';

interface UserInfo {
  user_name?: string;
  nick_name?: string;
  password?: string;
  gender?: number;
  city?: string;
  avatar?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(
    user_name: string,
    password: string,
    gender: number,
  ): Promise<User> {
    return await this.userModel.create({
      user_name,
      password: Crypto.md5(password),
      gender,
      nick_name: user_name,
    });
  }

  async changeInfo(id: number, userInfo: UserInfo): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    return await user.update({
      userInfo,
    });
  }

  async changePassword(id: number, password: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    return await user.update({ password: Crypto.md5(password) });
  }

  async getUserInfo(user_name: string, password: string | null): Promise<User> {
    let user;
    if (password) {
      user = await this.userModel.findOne({
        where: {
          user_name,
          password: Crypto.md5(password),
        },
      });
    } else {
      user = await this.userModel.findOne({ where: { user_name } });
    }
    return user;
  }
}
