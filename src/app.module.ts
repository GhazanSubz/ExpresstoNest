import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TaxModule } from './tax/tax.module';
import { UserBenefitsModule } from './user-benefits/user-benefits.module';
import { BenefitTypesService } from './benefit-types/benefit-types.service';
import { BenefitTypesController } from './benefit-types/benefit-types.controller';
import { BenefitTypesModule } from './benefit-types/benefit-types.module';

@Module({
  imports: [PrismaModule, UsersModule, TaxModule, UserBenefitsModule, BenefitTypesModule],
  controllers: [AppController, BenefitTypesController],
  providers: [AppService, BenefitTypesService],
})
export class AppModule {}
