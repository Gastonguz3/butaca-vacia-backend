import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMoviesDto } from './dto/search-movies.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('genres')
  async getGenres() {
    return this.moviesService.getGenres();
  }

  @Get('search')
  async searchMovies(@Query() searchMoviesDto: SearchMoviesDto): Promise<PaginatedResponseDto<any>> {
    return this.moviesService.searchMovies(searchMoviesDto);
  }

  @Get('popular')
  async getPopularMovies(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<any>>{
    return this.moviesService.getPopularMovies(paginationDto)
  }

  @Get(':id')
  async getMovieDetails(@Param('id', ParseIntPipe) movieId: number) {
    return this.moviesService.getMovieDetails(movieId);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id', ParseIntPipe) movieId: number) {
    return this.moviesService.getRecommendations(movieId);
  }
}
