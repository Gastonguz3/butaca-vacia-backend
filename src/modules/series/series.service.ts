import { Injectable } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { DiscoverSeriesDto } from './dto/discover-series.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class SeriesService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getGenres() {
    return this.tmdbService.getSeriesGenres();
  }

  async discoverRandomSeries(searchSeriesDto: DiscoverSeriesDto) {
    return this.tmdbService.discoverRandomSeries(searchSeriesDto);
  }

  async getPopularSeries(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<any>> {
    return this.tmdbService.getPopularSeries(
      paginationDto.page!,
      paginationDto.limit!,
    );
  }

  async getSeriesDetails(seriesId: number) {
    return this.tmdbService.getSeriesDetails(seriesId);
  }

  async getRecommendations(seriesId: number) {
    return this.tmdbService.getSeriesRecommendations(seriesId);
  }
}
