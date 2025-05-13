import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, UnauthorizedException, Req, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto'; 

@Controller('appointments')  
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

 @Post()
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Req() req: Request
  ) {
    const authHeader = req.headers['authorization']; 
    const token = authHeader.split(' ')[1];
    return this.appointmentService.create(createAppointmentDto, String(token));
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

    @Get('hours')  
  async getAppointmentHours(
    @Query('entrepreneurId') entrepreneurId: string,
    @Query('date') date: string, 
  ) {
    return this.appointmentService.getAppointmentHours(entrepreneurId, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
