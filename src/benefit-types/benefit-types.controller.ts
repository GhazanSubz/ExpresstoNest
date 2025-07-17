// src/benefit-types/benefit-types.controller.ts
import { Controller, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BenefitTypesService } from './benefit-types.service';
import { UpdateBenefitTypeDto } from './dto/update-benefit-type.dto';
import { ValidateParamsPipe } from 'src/common/pipes/validate-params.pipe';
import { FindUserDto } from 'src/users/dto/find-user.dto';

@Controller('benefit-types')
export class BenefitTypesController {
  constructor(private readonly benefitTypesService: BenefitTypesService) {}

  @Patch(':id')
  update(
    @Param(ValidateParamsPipe) params: FindUserDto,
    @Body() dto: UpdateBenefitTypeDto
  ) {
    return this.benefitTypesService.updateBenefitType(params.id, dto);
  }
}
