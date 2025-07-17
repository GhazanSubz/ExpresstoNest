import { Module } from '@nestjs/common';
import { UserBenefitsService } from './user-benefits.service';
import { UserBenefitsController } from './user-benefits.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserBenefitsService, PrismaService],
  controllers: [UserBenefitsController]
})
export class UserBenefitsModule {}
