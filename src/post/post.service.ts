import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTagsDto } from 'src/tags/dto/create-tags.dto';
import { create } from 'domain';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  async getPosts(userId: number) {
    return await this.prisma.post.findMany({
      where: {
        userId: userId
      }
    })
  }

  async getPostById(userId: number, postId: number) {
    const data = await this.prisma.post.findFirst({
      where: {
        userId: userId,
        id: postId
      },
      include: {
        tags: {
          select: {
            tag: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    const filter = data.tags.map((x) => {
      return x.tag.name
    })
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      tags: filter
    }
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        userId: userId,
        title: dto.title,
        description: dto.description,
        tags: {
          create: dto.tagsId.map((x) => ({
            tag: { connect: { id: x } }
          }))
        }
      },
      include: {
        tags: {
          select:{
            tag: {
              select:{
                name: true
              }
            }
          }
        }
      }
    })
    const filter = post.tags.map((x) => {
      return x.tag.name
    })
    return{
      id: post.id,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: filter

    };
  }

  async editPostById(userId: number, postId: number, dto: EditPostDto) {
    //get post by id
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    //cek jika user memiliki post ini
    if (!post || post.userId !== userId)
      throw new ForbiddenException(
        'Access to resource post denied!'
      )

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto
      }
    })
  }

  async deletePostById(userId: number, postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    //cek jika user memiliki post ini
    if (!post || post.userId !== userId)
      throw new ForbiddenException(
        'Access to resource post denied!'
      );

    await this.prisma.post.delete({
      where: {
        id: postId,
      }
    })
  }
}
