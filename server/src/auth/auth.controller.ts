import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this.authServices.login(req.user as UserEntity);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authServices.register(dto);
  }
}