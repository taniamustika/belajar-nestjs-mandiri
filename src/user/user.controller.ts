import { Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import { JwtGuard } from '../../src/auth/guards';
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
constructor(private readonly userService: UserService){}

  @ApiOperation({ summary: 'Mendapatkan current user'})
  @ApiResponse({})
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Mengedit user'})
  @ApiResponse({})
  @Patch()
  editUser(@Body() dto:EditUserDto, @GetUser('id') userId: number){
    return this.userService.editUser(userId, dto)
  }
}
