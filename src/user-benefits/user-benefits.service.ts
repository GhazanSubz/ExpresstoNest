import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserBenefitsDto } from './dto/update-user-benefits.dto';

@Injectable()
export class UserBenefitsService {
  constructor(private prisma: PrismaService) {}

  async updateUserBenefits(userId: number, dto: UpdateUserBenefitsDto) {
    const { benefit_type_ids } = dto;

    const userExists = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} does not exist.`);
    }

    await this.prisma.user_benefits.deleteMany({
      where: { user_id: userId },
    });

    const data = benefit_type_ids.map((benefit_type_id) => ({
      user_id: userId,
      benefit_type_id,
    }));
    //cslmskmlsm
    return this.prisma.user_benefits.createMany({ data });
  }
}

