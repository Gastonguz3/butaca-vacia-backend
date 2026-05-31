import { Module } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [TmdbService],
  exports:[TmdbService],
  imports:[HttpModule],
  
})
export class TmdbModule {}
