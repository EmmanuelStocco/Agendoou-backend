import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; 

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  } 

  async findOneByToken(token: string) {
    try { 
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);       
      const userId = decoded.sub;

      if (!userId) throw new UnauthorizedException('Token inválido');

      return await this.prisma.user.findUnique({ where: { id: Number(userId) }, 
        include: {     
          appointmentsAsClient: true
        }
    }) ;

    // const password = user?.password; // Obtenha a senha do usuário
    //   return {
    //     ...user
    //   }
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  } 
}
