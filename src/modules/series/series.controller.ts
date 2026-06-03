import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SearchSeriesDto } from './dto/search-series.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get('genres')
  async getGenres() {
    return this.seriesService.getGenres();
  }

  @Get('search')
  async searchSeries(@Query() searchSeriesDto: SearchSeriesDto) : Promise<PaginatedResponseDto<any>> {
    return this.seriesService.searchSeries(searchSeriesDto);
  }

  @Get('popular')
  async getPopularSeries(paginationDto : PaginationDto) : Promise<PaginatedResponseDto<any>>{
    return this.seriesService.getPopularSeries(paginationDto)
  }

  @Get(':id')
  async getSerieDetails(@Param('id', ParseIntPipe) seriesId: number) {
    return this.seriesService.getSeriesDetails(seriesId);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id', ParseIntPipe) seriesId: number) {
    return this.seriesService.getRecommendations(seriesId);
  }
}
