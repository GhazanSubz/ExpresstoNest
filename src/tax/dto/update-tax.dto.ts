import { IsOptional, IsDecimal } from 'class-validator';

export class UpdateTaxDto {
  @IsOptional()
  @IsDecimal()
  min_salary?: string;

  @IsOptional()
  @IsDecimal()
  max_salary?: string;

  @IsOptional()
  @IsDecimal()
  tax_percent?: string;
}