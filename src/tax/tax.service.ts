import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Injectable()
export class TaxService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tax.findMany(
        {orderBy: {
            id: 'asc',
        },}
    );
  }

  async update(id: number, dto: UpdateTaxDto) {
    const exists = await this.prisma.tax.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Tax slab not found');

    return this.prisma.tax.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }
}