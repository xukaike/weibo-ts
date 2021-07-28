import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionResult } from '../common/filter/http-exception-result';
import { IsExistDto } from './dto/is-exist.dto';
import { RegisterDto } from './dto/register.dto';
import { changeInfoDto } from './dto/change-info.dto';
import { changePasswordDto } from './dto/change-password.dto';
import { loginDto } from './dto/login.dto';
import { Crypto } from '../common/utils/crypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('isExist')
  @UsePipes(new ValidationPipe({ transform: true }))
  async isExist(@Query() query: IsExistDto) {
    const { user_name } = query;
    return await this.userService.getUserInfo(user_name, null);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() body: RegisterDto) {
    const { user_name, password, gender } = body;
    const exist = await this.userService.getUserInfo(user_name, password);
    if (exist) {
      throw new HttpException(
        HttpExceptionResult.USERNAME_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.create(user_name, password, gender);
  }

  @Post('login')
  async login(@Body() body: loginDto, @Session() session) {
    const { user_name, password } = body;
    const user = await this.userService.getUserInfo(user_name, password);
    if (!user) {
      throw new HttpException(
        HttpExceptionResult.LOGIN_FAIL,
        HttpStatus.BAD_REQUEST,
      );
    }
    session.user = user;
    return user;
  }

  @Post('changeInfo')
  async changeInfo(@Body() body: changeInfoDto, @Session() session) {
    const { user_name, nick_name, city, avatar, gender } = body;
    const { user } = session;
    return this.userService.changeInfo(
      user,
      user_name,
      nick_name,
      city,
      avatar,
      gender,
    );
  }

  @Post('changePassword')
  async changePassword(@Body() body: changePasswordDto, @Session() session) {
    const { old_password, new_password } = body;
    const user = session.user;
    const valid = await this.userService.getUserInfo(
      user.user_name,
      old_password,
    );
    if (!valid) {
      throw new HttpException(
        HttpExceptionResult.PASSWORD_WRONG,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.userService.changePassword(user, new_password);
  }
}
