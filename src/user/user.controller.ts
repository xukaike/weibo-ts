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
import { changeInfoDto, IsExistDto, loginDto, RegisterDto } from './user.dto';
import { HttpExceptionResult } from '../core/filter/http-exception-result';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('isExist')
  @UsePipes(new ValidationPipe({ transform: true }))
  async isExist(@Query() query: IsExistDto) {
    const { id } = query;
    return await this.userService.findOne(id);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() body: RegisterDto) {
    const { user_name, password, gender } = body;
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
    const user = session.user;
  }

  @Post('changePassword')
  async changePassword(@Body() body: changeInfoDto, @Session() session) {}
}
