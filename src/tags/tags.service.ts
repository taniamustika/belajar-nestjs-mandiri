import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service';
import { CreateTagsDto } from './dto/create-tags.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTags(){
    return await this.prisma.tag.findMany ({})
  }

  async createTags(dto: CreateTagsDto) {
    return await this.prisma.tag.create ({
      data: {
        name: dto.name,
      }
    })
  }
}