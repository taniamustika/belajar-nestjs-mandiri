import { Controller, Get, Patch, UseGuards} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { User } from '@prisma/client'
import { GetUser } from '../auth/decorator'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(){
    
  }
}
