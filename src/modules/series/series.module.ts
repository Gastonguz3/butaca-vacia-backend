import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
  imports:[TmdbModule]
})
export class SeriesModule {}
