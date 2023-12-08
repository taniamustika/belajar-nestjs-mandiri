import { UseGuards, Get, Post, Param, Body, ParseIntPipe, HttpStatus, HttpCode, Delete, Patch, Controller } from '@nestjs/common';
import { JwtGuard } from '../auth/guards';
import { PostService } from './post.service';
import { GetUser } from '../../src/auth/decorator';
import { CreatePostDto, EditPostDto } from './dto';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService){}

  @Get()
  getPosts(@GetUser('id') userId: number) {
    return this.postService.getPosts(userId)
  }

  @Get(':id')
  getPostById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) postId: number){
    return this.postService.getPostById(userId, postId)
  }

  @Post()
  createPost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Patch(':id')
  editPostById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) postId: number, @Body() dto: EditPostDto){
  return this.postService.editPostById(userId, postId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) postId: number){
    return this.postService.deletePostById(userId, postId)
  }
}