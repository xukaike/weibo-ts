import { IsString } from 'class-validator';

export class IsExistDto {
  @IsString()
  user_name: string;
}
