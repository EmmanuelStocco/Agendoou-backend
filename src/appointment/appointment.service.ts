import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAppointmentDto) {
    const { date, ...rest } = data;
  
    const appointmentDate = new Date(date);
   
    return this.prisma.appointment.create({
      data: {
        ...rest,
        date: appointmentDate
      },
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

  update(id: number, data: UpdateAppointmentDto) { 
    const { date, time, ...rest } = data;
    if(!date || !time) {
      return this.prisma.appointment.update({
        where: { id },
        data: {
          ...rest,
        }
      });
    }

    const appointmentDate = new Date(date);
    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...rest,
        date: appointmentDate
      }
    });  
  }

  remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
