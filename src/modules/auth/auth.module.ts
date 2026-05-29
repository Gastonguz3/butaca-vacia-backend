import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory: (configService : ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.getOrThrow<string>('JWT_EXPIRES_IN'))
        }
      })
    })
  ]
})
export class AuthModule {}
