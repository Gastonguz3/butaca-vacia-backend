import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import type { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RefreshAuthGuard } from 'src/common/guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const data = await this.authService.register(registerDto);

    res.cookie(
      'refreshToken',
      data.refreshToken,
      this.getRefreshTokenCookieConfig(),
    );

    return {
      accessToken: data.accessToken,
      user: data.user,
    };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const data = await this.authService.login(loginDto);

    res.cookie(
      'refreshToken',
      data.refreshToken,
      this.getRefreshTokenCookieConfig(),
    );

    return {
      accessToken: data.accessToken,
      user: data.user,
    };
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)  // Valida el refresh token desde cookie, verifica firma JWT y lo compara con el hash en DB
  async refresh(
    @GetUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const data = await this.authService.refresh(userId);

    res.cookie(
      'refreshToken',
      data.refreshToken,
      this.getRefreshTokenCookieConfig(),
    );

    return {
      accessToken: data.accessToken,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard) // Protege el endpoint con access token (Authorization header). Si es valido, inyecta el usuario en req.user
  async logout(
    @GetUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await this.authService.logout(userId);

    res.clearCookie('refreshToken', this.getClearRefreshTokenCookieConfig());

    return { message: 'Successfully logged out' };
  }

  //Metodos para obtener las configuraciones de las cookies
  private getRefreshTokenCookieConfig(): CookieOptions {
    const nodeEnv = this.configService.getOrThrow('NODE_ENV');

    return {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: 'lax',
      path: '/auth/refresh', //la cookie solo se manda al endpoint refresh
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    };
  }

  private getClearRefreshTokenCookieConfig(): CookieOptions {
    const nodeEnv = this.configService.getOrThrow('NODE_ENV');
    return {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
    };
  }
}
