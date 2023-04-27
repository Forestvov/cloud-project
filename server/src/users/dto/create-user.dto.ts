import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@mail.ru',
  })
  email: string;

  @ApiProperty({
    default: 'aleksey k',
  })
  fullName: string;

  @ApiProperty({
    default: '1234567',
  })
  password: string;
}
