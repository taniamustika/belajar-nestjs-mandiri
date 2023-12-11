import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest()
      //console.dir(request.user)
      //console.log(data)
    if(data) {
      return request.user[data];
    }
    return request.user;
  }
);