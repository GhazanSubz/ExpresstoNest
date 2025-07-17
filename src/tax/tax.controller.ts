import { Controller, Get, Param, ParseIntPipe, Patch, Body, Post } from '@nestjs/common';
import { TaxService } from './tax.service';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { ValidateParamsPipe } from 'src/common/pipes/validate-params.pipe';
import { FindUserDto } from 'src/users/dto/find-user.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  getAllSlabs() {
    return this.taxService.findAll();
  }

  @Patch(':id')
  updateTaxSlab(
    @Param(ValidateParamsPipe) params: FindUserDto,
    @Body() dto: UpdateTaxDto,
  ) {
    return this.taxService.update(params.id, dto);
  }
}