import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { UserModule } from './user/user.module';

import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EntrepreneurModule } from './entrepreneur/entrepreneur.module';

@Module({
  imports: [UserModule, AuthModule, EntrepreneurModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
