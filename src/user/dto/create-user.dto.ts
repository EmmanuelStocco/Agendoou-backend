// src/user/dto/create-user.dto.ts
import { Role } from '@prisma/client';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
}
