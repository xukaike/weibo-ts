import { IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class IsExistDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  id: number;
}

export class RegisterDto {
  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  gender = 2;
}

export class changeInfoDto {
  @IsString()
  user_name: string;

  @IsString()
  nick_name: string;

  @IsString()
  city: string;

  @IsString()
  avatar: string;
}

export class changePasswordDto {
  @IsString()
  old_password: string;

  @IsString()
  new_password: string;
}

export class loginDto {
  @IsString()
  user_name: string;

  @IsString()
  password: string;
}
