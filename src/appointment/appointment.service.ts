import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto'; 
import { Errors } from 'src/common/errors'; 
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateAppointmentDto, token: string) {
    const { date, time, notes, entrepreneurId: slug } = data;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const clientId = Number(decoded.sub);

    if (!clientId) throw new UnauthorizedException('Token inválido');

    const entrepreneur = await this.prisma.entrepreneurProfile.findFirst({
      where: {
        slug: String(slug),
      },
    });

    if (!entrepreneur) {
      throw new NotFoundException('Empreendedor não encontrado');
    }

    // const appointmentDate = new Date(date);
    const [year, month, day] = date.split('-').map(Number);
  const appointmentDate = new Date(year, month - 1, day); 
  console.log('appointmentDate', appointmentDate)
  // Local timezone


    const existing = await this.prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        time,
        entrepreneurId: entrepreneur.id,
      },
    });

    if (existing) {
      throw Errors.AppointmentConflict();
    }

    return this.prisma.appointment.create({
      data: {
        date: appointmentDate,
        time,
        notes,
        entrepreneurId: entrepreneur.id,
        clientId,
        status: 'confirmed',
      },
    });
  }

  async update(id: number, data: UpdateAppointmentDto) {
    const { date, time, ...rest } = data;

    if (!date || !time) {
      return this.prisma.appointment.update({
        where: { id },
        data: rest,
      });
    }

    const appointmentDate = new Date(date);
    const existing = await this.prisma.appointment.findFirst({
      where: {
        id: { not: id },
        date: appointmentDate,
        time,
      },
    });

    if (existing) {
      throw Errors.AppointmentConflict();
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...rest,
        date: appointmentDate,
        time,
      },
    });
  }

  remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: { client: true, entrepreneur: true },
    });
  }

  findOne(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { client: true, entrepreneur: true },
    });
  }

async getAppointmentHours(entrepreneurId: string, date: string) { 
  const entrepreneur = await this.prisma.entrepreneurProfile.findUnique({
    where: { slug: entrepreneurId },
    select: { id: true },
  })
  
  if (!entrepreneur) {
    throw new NotFoundException('Empreendedor não encontrado');
  }

  const appointments = await this.prisma.appointment.findMany({
    where: {
      entrepreneurId: Number(entrepreneur.id),
      date: new Date(date),
    },
    select: { time: true },
  }); 

  // const hoursAvailable = await this.prisma.entrepreneurProfile.findUnique({
  //   where: { id: entrepreneurId },
  //   select: { availableHours: true },
  // });
  return {'appointments': [appointments], 
    // ...hoursAvailable
  }
}
}
