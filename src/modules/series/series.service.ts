import { Injectable } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { DiscoverSeriesDto } from './dto/discover-series.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { SeriesDetailsDto } from './dto/series-details.dto';
import { Genre } from 'src/common/dto/genre';
import { SeriesDto } from './dto/series.dto';

@Injectable()
export class SeriesService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getGenres() : Promise<Genre[]>  {
    return this.tmdbService.getSeriesGenres();
  }

  async discoverRandomSeries(searchSeriesDto: DiscoverSeriesDto): Promise<SeriesDto>  {
    return this.tmdbService.discoverRandomSeries(searchSeriesDto);
  }

  async getPopularSeries(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<SeriesDto>> {
    return this.tmdbService.getPopularSeries(
      paginationDto.page!,
      paginationDto.limit!,
    );
  }

  async getSeriesDetails(seriesId: number) : Promise<SeriesDetailsDto>  {
    return this.tmdbService.getSeriesDetails(seriesId);
  }

  async getRecommendations(seriesId: number): Promise<SeriesDto[]>  {
    return this.tmdbService.getSeriesRecommendations(seriesId);
  }
}
