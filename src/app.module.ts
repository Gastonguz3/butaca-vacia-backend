import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { TmdbModule } from './modules/tmdb/tmdb.module';
import { SeriesModule } from './modules/series/series.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({  //Lee .env y lo carga en process.env
      isGlobal: true,    
      validationSchema: envSchema,  //Valida todo el objeto: envSchema.validate(process.env) y si pasa crea ConfigService
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    TmdbModule,
    SeriesModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
