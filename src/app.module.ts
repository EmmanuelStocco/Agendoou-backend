import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { UserModule } from './user/user.module';

import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EntrepreneurModule } from './entrepreneur/entrepreneur.module';
import { AppointmentModule } from './appointment/appointment.module';


@Module({
  imports: [UserModule, AuthModule, EntrepreneurModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
