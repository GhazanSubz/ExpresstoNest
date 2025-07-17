import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateBenefitTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
