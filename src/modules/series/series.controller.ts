import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SeriesService } from './series.service';
import { DiscoverSeriesDto } from './dto/discover-series.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { SeriesDetailsDto } from './dto/series-details.dto';
import { Genre } from 'src/common/dto/genre';
import { SeriesDto } from './dto/series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get('genres')
  async getGenres() : Promise<Genre[]> {
    return this.seriesService.getGenres();
  }

  @Get('discover')
  async discoverRandomSeries(@Query() searchSeriesDto: DiscoverSeriesDto): Promise<SeriesDto> {
    return this.seriesService.discoverRandomSeries(searchSeriesDto);
  }

  @Get('popular')
  async getPopularSeries(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<SeriesDto>> {
    return this.seriesService.getPopularSeries(paginationDto);
  }

  @Get(':id')
  async getSerieDetails(@Param('id', ParseIntPipe) seriesId: number) : Promise<SeriesDetailsDto> {
    return this.seriesService.getSeriesDetails(seriesId);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id', ParseIntPipe) seriesId: number): Promise<SeriesDto[]>  {
    return this.seriesService.getRecommendations(seriesId);
  }
}
