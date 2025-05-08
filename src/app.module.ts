import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { UserModule } from './user/user.module';

import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EntrepreneurModule } from './entrepreneur/entrepreneur.module';
import { AppointmentModule } from './appointment/appointment.module';

import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [UserModule, AuthModule, EntrepreneurModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
        { path: 'entrepreneurs/slug/:slug', method: RequestMethod.GET },
        { path: 'entrepreneurs', method: RequestMethod.POST },
      )
      .forRoutes('*'); 
  }
}
