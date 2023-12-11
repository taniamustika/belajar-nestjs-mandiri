import { AuthGuard } from "@nestjs/passport"

//Guard untuk role
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}