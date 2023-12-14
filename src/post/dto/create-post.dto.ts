import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ example: 'Experience', description: 'Masukkan title anda di sini' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Experience is a teacher of life', description: 'Masukkan description anda di sini'})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: [1], description: 'Pilih tag id'})
  @IsArray()
  tagsId: [];
}