import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { DiscoverMovieDto } from './dto/discover-movies.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { MovieDetailsDto } from './dto/movie-details.dto';
import { Genre } from 'src/common/dto/genre';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('genres')
  async getGenres() : Promise<Genre[]> {
    return this.moviesService.getGenres();
  }

  @Get('discover')
  async discoverRandomMovie(@Query() searchMoviesDto: DiscoverMovieDto) : Promise<MovieDto> {
    return this.moviesService.discoverRandomMovie(searchMoviesDto);
  }

  @Get('popular')
  async getPopularMovies(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<MovieDto>> {
    return this.moviesService.getPopularMovies(paginationDto);
  }

  @Get(':id')
  async getMovieDetails(@Param('id', ParseIntPipe) movieId: number): Promise<MovieDetailsDto> {
    return this.moviesService.getMovieDetails(movieId);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id', ParseIntPipe) movieId: number): Promise<MovieDto[]>  {
    return this.moviesService.getRecommendations(movieId);
  }
}
