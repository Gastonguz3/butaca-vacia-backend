import { Controller, Get, Param, Query } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SearchSeriesDto } from './dto/search-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get('genres')
  async getGenres() {
    return this.seriesService.getGenres();
  }

  @Get('search')
  async searchSeries(@Query() searchSeriesDto: SearchSeriesDto) {
    return this.seriesService.searchSeries(searchSeriesDto);
  }

  @Get(':id')
  async getSerieDetails(@Param('id') seriesId: number) {
    return this.seriesService.getSeriesDetails(seriesId);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id') seriesId: number) {
    return this.seriesService.getRecommendations(seriesId);
  }
}
