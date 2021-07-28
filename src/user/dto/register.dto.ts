import { IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  gender = 2;
}
