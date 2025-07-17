import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
       constructor(private prisma: PrismaService) {}

       async getAllUsers() {
        const users = await this.prisma.users.findMany(
            {
                orderBy: {
                    id: 'asc',
                },
            }
        ); 

        return users.map(user=>({
            ...user,
            salary: Number(user.salary)
        })
        )
      }

       async getOneUser(id: number) {
          const user = await this.prisma.users.findUnique({
            where: {id},
          })

          if (!user) return null;

          return {
            ...user,
            salary:Number(user.salary)
          }
       }

       async calculateNetSalary(userId: number) {
        const user = await this.prisma.users.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            salary: true,
            user_benefits: {
              include: {
                benefit_types: true,
              },
            },
          },
        });
      
        if (!user) throw new NotFoundException('User not found');
      
        const totalBenefits = user.user_benefits.reduce((sum, ub) => {
          return sum + (user.user_benefits[0].benefit_types?.amount?.toNumber() || 0);
        }, 0);
      
        const grossSalary = user.salary.toNumber() + totalBenefits;
      
        const taxSlab = await this.prisma.tax.findFirst({
          where: {
            min_salary: { lte: grossSalary },
            max_salary: { gte: grossSalary },
          },
        });
      
        const taxPercent = taxSlab?.tax_percent?.toNumber() || 0;
        const taxAmount = (grossSalary * taxPercent) / 100;
      
        const netSalary = grossSalary - taxAmount;
      
        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          baseSalary: user.salary.toNumber(),
          totalBenefits,
          grossSalary,
          taxPercent,
          taxAmount,
          netSalary,
        };
      }
      
      
    }