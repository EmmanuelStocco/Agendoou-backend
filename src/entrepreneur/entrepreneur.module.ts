import { Module } from '@nestjs/common';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurController } from './entrepreneur.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EntrepreneurController],
  providers: [EntrepreneurService, PrismaService],
})
export class EntrepreneurModule {}
