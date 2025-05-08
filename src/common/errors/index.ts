import { BadRequestException } from '@nestjs/common';

export const Errors = {
  AppointmentConflict: () =>
    new BadRequestException({
      statusCode: 400,
      message: 'Já existe um agendamento para este horário.',
      error: 'Bad Request',
      code: 'APPOINTMENT_CONFLICT',
    }),
 
  UserNotFound: () =>
    new BadRequestException({
      statusCode: 400,
      message: 'Usuário não encontrado.',
      error: 'Bad Request',
      code: 'USER_NOT_FOUND',
    }),
};
