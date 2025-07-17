import { IsArray, IsInt } from 'class-validator';

export class UpdateUserBenefitsDto {
  @IsArray()
  @IsInt({ each: true })
  benefit_type_ids: number[];
}