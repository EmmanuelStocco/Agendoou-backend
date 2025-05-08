import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { BadRequestException } from '@nestjs/common';
import { Errors } from 'src/common/errors';
@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    const { date, time, entrepreneurId } = data;
  
    const appointmentDate = new Date(date);
  
    const existing = await this.prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        time,
        entrepreneurId
      },
    });
  
    if (existing) {
      throw Errors.AppointmentConflict()
    }
  
    return this.prisma.appointment.create({
      data: {
        ...data,
        date: appointmentDate,
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
}
