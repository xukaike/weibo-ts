import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { Crypto } from '../common/utils/crypto';

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
  ): Promise<void> {
    // return await this.userModel.create({
    //   user_name,
    //   password: Crypto.md5(password),
    //   gender,
    //   nick_name: user_name,
    // });
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
    return await user.save();
  }

  async changePassword(user: User, password: string): Promise<User> {
    user.password = Crypto.md5(password);
    return await user.save();
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
