import { Module } from '@nestjs/common';
import { BenefitTypesService } from './benefit-types.service';
import { BenefitTypesController } from './benefit-types.controller';
import { PrismaService } from '../prisma/prisma.service'; // adjust path if needed

@Module({
  controllers: [BenefitTypesController],
  providers: [BenefitTypesService, PrismaService],
})
export class BenefitTypesModule {}