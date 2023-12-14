import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class EditUserDto {
  @ApiProperty({ example: 'tania@gmail.com', description: 'Masukkan email'})
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'Tania', description: 'Nama depan'})
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Sugiharto', description: 'Nama belakang'})
  @IsString()
  @IsOptional()
  lastName?: string;
}