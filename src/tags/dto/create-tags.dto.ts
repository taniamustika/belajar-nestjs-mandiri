import { IsOptional, IsString } from "class-validator";

export class CreateTagsDto{
  @IsString()
  @IsOptional()
  name: String;
}