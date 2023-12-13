import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class AuthDto {
  @ApiProperty({ example: 'tania@gmail.com', description:'Masukan email anda di sini' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Masukan password kamu di sini' })
  @IsString()
  @IsNotEmpty()
  password: string;
}