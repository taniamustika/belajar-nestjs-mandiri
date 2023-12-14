import { UseGuards, Controller, Get, Post, Body } from '@nestjs/common'
import { TagsService } from './tags.service';
import { JwtGuard } from 'src/auth/guards';
import { CreateTagsDto } from './dto/create-tags.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Tag')
@UseGuards(JwtGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly createTagsService: TagsService){}

  @ApiOperation({ summary: 'Cara melihat daftar tag yang sudah dibuat' })
  @ApiResponse({})
  @Get()
  getTags(){
    return this.createTagsService.getTags()
  }

  @ApiOperation({ summary: 'Membuat tag'})
  @ApiResponse({})
  @Post()
  createTags(@Body() dto: CreateTagsDto){
    return this.createTagsService.createTags(dto)
  }
}