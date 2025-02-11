import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Public } from '@app/common/decorators/public';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: '用户名',
          example: 'admin',
        },
        password: {
          type: 'string',
          description: '密码',
          example: '123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          description: '用户信息',
        },
        token: {
          type: 'string',
          description: 'JWT token',
        },
      },
    },
  })
  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  async login(@Req() req: any) {
    return {
      user: req.user,
      token: this.jwtService.sign(req.user.id),
    };
  }
}
