import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateTagsDto{
  @ApiProperty({ example: 'birthday', description: 'tag'})
  @IsString()
  @IsOptional()
  name: string;
}