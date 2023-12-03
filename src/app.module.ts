import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { PostModule } from "./post/post.module";

@Module({
  imports:[ConfigModule.forRoot({isGlobal: true}), AuthModule, UserModule, PostModule]
})
export class AppModule {}