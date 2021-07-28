import { IsString } from 'class-validator';

export class loginDto {
  @IsString()
  user_name: string;

  @IsString()
  password: string;
}
