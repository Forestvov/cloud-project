import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('Пользователь не найден');

    const isValid = await verify(user.password, password);

    if (!isValid) throw new UnauthorizedException('Пароль введн не верно');

    return user;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.userService.create({
        fullName: dto.fullName,
        email: dto.email,
        password: await hash(dto.password),
      });

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException('Ошибки при регистрации');
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
