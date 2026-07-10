import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TmdbModule]
})
export class ReviewsModule {}
