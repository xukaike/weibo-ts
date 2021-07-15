import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class IsExistDto {
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
