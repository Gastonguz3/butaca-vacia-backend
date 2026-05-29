import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({  //Lee .env y lo carga en process.env
      isGlobal: true,    
      validationSchema: envSchema,  //Valida todo el objeto: envSchema.validate(process.env) y si pasa crea ConfigService
    }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
