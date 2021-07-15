import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IsExistDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('isExist')
  @UsePipes(new ValidationPipe({ transform: true }))
  async isExist(@Query() query: IsExistDto) {
    const { id } = query;
    return await this.userService.findOne(id);
  }
}
