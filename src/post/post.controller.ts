import { UseGuards, Get, Post, Param, Body, ParseIntPipe, HttpStatus, HttpCode, Delete, Patch, Controller } from '@nestjs/common';
import { JwtGuard } from '../auth/guards';
import { PostService } from './post.service';
import { GetUser } from '../../src/auth/decorator';
import { CreatePostDto, EditPostDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Post')
@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService){}

  @ApiOperation({summary: 'Api untuk mendapatkan seluruh post berdasarkan post yang dimiliki user tertentu'})
  @ApiResponse({status: 200, description: '{}'})
  @Get()
  getPosts(@GetUser('id') userId: number) {
    return this.postService.getPosts(userId)
  }

  @ApiOperation({summary: 'Cara mendapatkan post sesuai id post nya'})
  @ApiResponse({})
  @Get(':ab')
  getPostById(@GetUser('id') userId: number, @Param('ab', ParseIntPipe) postId: number){
    return this.postService.getPostById(userId, postId)
  }

  @ApiOperation({summary: 'Membuat post'})
  @ApiResponse({status: 200, description: '{}'})
  //@Body untuk taruh data request body
  @Post()
  createPost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @ApiOperation({summary: 'Mengedit post'})
  @ApiResponse({})
  @Patch(':id')
  editPostById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) postId: number, @Body() dto: EditPostDto){
  return this.postService.editPostById(userId, postId, dto)
  }

  @ApiOperation({summary: 'Menghapus post'})
  @ApiResponse({})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) postId: number){
    return this.postService.deletePostById(userId, postId)
  }
}