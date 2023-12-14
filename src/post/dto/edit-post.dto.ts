import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditPostDto {
  @ApiProperty({ example: 'Begadang', description: 'Ini adalah title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Begadang merupakan tidur sampai larut malam', description: 'Penjelasan lengkap tentang title' })
  @IsString()
  @IsOptional()
  description?: string;
}