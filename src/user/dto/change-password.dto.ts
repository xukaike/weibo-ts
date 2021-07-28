import { IsString } from 'class-validator';

export class changePasswordDto {
  @IsString()
  old_password: string;

  @IsString()
  new_password: string;
}
