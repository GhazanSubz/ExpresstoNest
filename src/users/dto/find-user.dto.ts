import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class FindUserDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be at least 1' })
  id: number;
}