import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('isExist')
  isExist(@Query() query) {
    const { id } = query;
    return this.userService.findOne(id);
  }
}
