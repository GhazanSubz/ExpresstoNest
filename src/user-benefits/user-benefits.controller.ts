import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UserBenefitsService } from './user-benefits.service';
import { UpdateUserBenefitsDto } from './dto/update-user-benefits.dto';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { ValidateParamsPipe } from 'src/common/pipes/validate-params.pipe';

@Controller('user-benefits')
export class UserBenefitsController {
  constructor(private readonly userBenefitsService: UserBenefitsService) {}

  @Patch(':id')
  updateUserBenefits(
    @Param(ValidateParamsPipe) params: FindUserDto,
    @Body() dto: UpdateUserBenefitsDto,
  ) {
    return this.userBenefitsService.updateUserBenefits(params.id, dto);
  }
}