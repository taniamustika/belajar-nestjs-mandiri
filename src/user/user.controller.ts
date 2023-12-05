import { Controller, Get, Patch, UseGuards} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(user: User) {
    return user;
  }

  @Patch()
  editUser(){
    
  }
}
