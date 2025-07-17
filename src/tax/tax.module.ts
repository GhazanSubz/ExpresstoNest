import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TaxService, PrismaService],
  controllers: [TaxController]
})
export class TaxModule {}
