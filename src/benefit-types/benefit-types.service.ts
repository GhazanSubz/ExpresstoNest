import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBenefitTypeDto } from './dto/update-benefit-type.dto';

@Injectable()
export class BenefitTypesService {

    constructor(private prisma: PrismaService) {}

  async updateBenefitType(id: number, dto: UpdateBenefitTypeDto) {
    const benefit = await this.prisma.benefit_types.findUnique({ where: { id } });

    if (!benefit) {
      throw new NotFoundException(`Benefit type with ID ${id} not found`);
    }

    return this.prisma.benefit_types.update({
      where: { id },
      data: {
        name: dto.name,
        amount: dto.amount,
      },
    });
  }
}
