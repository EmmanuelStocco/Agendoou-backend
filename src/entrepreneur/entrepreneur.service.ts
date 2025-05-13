import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntrepreneurDto } from './dto/create-entrepreneur.dto';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import { slugify } from 'src/utils'; 

@Injectable()
export class EntrepreneurService {
    constructor(private prisma: PrismaService) { }

    create(data: CreateEntrepreneurDto) {
        const {
            userId,
            businessName,
            themeColor,
            logoUrl,
            description,
            availableDays,
            availableHours,
            services,
        } = data;

        const slug = slugify(businessName);

        return this.prisma.entrepreneurProfile.create({
            data: {
                userId,
                businessName,
                themeColor,
                logoUrl,
                description,
                availableDays,
                availableHours,
                services,
                slug,
            },
        });
    }


    findAll() {
        return this.prisma.entrepreneurProfile.findMany({
            include: { user: true },
        });
    }

    findOne(id: number) {
        return this.prisma.entrepreneurProfile.findUnique({
            where: { id },
            include: { user: true },
        });
    }

    findBySlug(slug: string) {
        return this.prisma.entrepreneurProfile.findUnique({
          where: { slug },
        });
      }
      

    update(id: number, data: UpdateEntrepreneurDto) {
        return this.prisma.entrepreneurProfile.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.entrepreneurProfile.delete({
            where: { id },
        });
    }

    async searchCompanies(query: string) {
        return this.prisma.entrepreneurProfile.findMany({
          where: {
            slug: {
              startsWith: query,
              mode: 'insensitive',
            }
          },
          take: 5,
          select: { 
            slug: true
          },
        });
      }  

    async getAppointmentHours(entrepreneurId: string, date: string) {  
         const hoursAvailable = await this.prisma.entrepreneurProfile.findUnique({
            where: { slug: entrepreneurId },
            select: { availableHours: true },
        });

        return { 
            ...hoursAvailable,
        };
    }
}
