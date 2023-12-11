import { UseGuards, Controller, Get, Post, Body } from '@nestjs/common'
import { TagsService } from './tags.service';
import { JwtGuard } from 'src/auth/guards';
import { CreateTagsDto } from './dto/create-tags.dto';

@UseGuards(JwtGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly createTagsService: TagsService){}

  @Get()
  getTags(){
    return this.createTagsService.getTags()
  }

  @Post()
  createTags(@Body() dto: CreateTagsDto){
    return this.createTagsService.createTags(dto)
  }
}