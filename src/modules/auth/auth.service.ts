import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('Auth-Service');
  private readonly SALT_ROUNDS = 12;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, username } = registerDto;

    //Verifico que el email y username no existan
    const existingUser = await this.prisma.user.findUnique({
      where: {email},
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists'); //error 409
    }

    const existingUsername = await this.prisma.user.findUnique({
      where: {username},
    });

    if (existingUsername) {
      throw new ConflictException('User with this username already exists');
    }

    try {
      //Hasheo el password y creo el usuario
      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

      const newUser = await this.prisma.user.create({
        data: { email, password: hashedPassword, username },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          password: false,
        },
      });

      const tokens = await this.generateTokens(newUser.id, newUser.email);

      await this.updateRefreshToken(newUser.id, tokens.refreshToken);

      return {
      ...tokens,
      user: newUser
    };

    } catch (error) {
      this.logger.log('error during user registration: ', error);
      throw new InternalServerErrorException(
        'An error occurred during registration',
      );
    }
  }

  
  async generateTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      this.SALT_ROUNDS,
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }
}
