import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiException } from '@app/common/http-exception/api.exception';
import { ErrorCodeEnum } from '@app/common/enums/errorCodeEnum';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/common/decorators/public';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err: HttpException, user: any) {
    if (err || !user) {
      throw new ApiException(ErrorCodeEnum.USER_NO_AUTH);
    }
    return user;
  }
}
