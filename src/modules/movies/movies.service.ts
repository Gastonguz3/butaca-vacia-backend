import { Injectable } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { DiscoverMovieDto } from './dto/discover-movies.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { MovieDetailsDto } from './dto/movie-details.dto';
import { Genre } from 'src/common/dto/genre';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getGenres() : Promise<Genre[]> {
    return this.tmdbService.getMovieGenres();
  }

  async discoverRandomMovie(searchMoviesDto: DiscoverMovieDto) : Promise<MovieDto>  {
    return this.tmdbService.discoverRandomMovie(searchMoviesDto);
  }

  async getPopularMovies(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<MovieDto>> {
    return this.tmdbService.getPopularMovies(
      paginationDto.page!,
      paginationDto.limit!,
    );
  }

  async getMovieDetails(movieId: number) : Promise<MovieDetailsDto> {
    return this.tmdbService.getMovieDetails(movieId);
  }

  async getRecommendations(movieId: number) : Promise<MovieDto[]> {
    return this.tmdbService.getMovieRecommendations(movieId);
  }
}
