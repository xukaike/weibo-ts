import { IsNumber, IsOptional, IsString } from 'class-validator';

export class changeInfoDto {
  @IsString()
  user_name: string;

  @IsString()
  @IsOptional()
  nick_name: string;

  @IsNumber()
  @IsOptional()
  gender: number;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
