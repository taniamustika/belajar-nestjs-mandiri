import { Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import { JwtGuard } from '../../src/auth/guards';
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
constructor(private readonly userService: UserService){}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@Body() dto:EditUserDto, @GetUser('id') userId: number){
    return this.userService.editUser(userId, dto)
  }
}
