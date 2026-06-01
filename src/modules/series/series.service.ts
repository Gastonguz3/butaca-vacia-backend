import { Injectable } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { SearchSeriesDto } from './dto/search-series.dto';

@Injectable()
export class SeriesService {

    constructor(private readonly tmdbService: TmdbService) {}
    
      async getGenres() {
        return this.tmdbService.getSeriesGenres();
      }
    
      async searchSeries(searchSeriesDto: SearchSeriesDto) {
        const { genre } = searchSeriesDto;  //Mas adelante agregare el resto
    
        return this.tmdbService.discoverSeries({genre});
      }
    
      async getSeriesDetails(seriesId: number) {
        return this.tmdbService.getSeriesDetails(seriesId);
      }
    
      async getRecommendations(seriesId: number) {
        return this.tmdbService.getSeriesRecommendations(seriesId);
      }
}
