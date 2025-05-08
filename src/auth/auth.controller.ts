import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  } 
  
  @Get('findOneByToken')
  findOneByToken(@Req() req: Request) {   
    const authHeader = req.headers['authorization']; 
    const token = authHeader.split(' ')[1];
    return this.authService.findOneByToken(token as string);
  }
}
