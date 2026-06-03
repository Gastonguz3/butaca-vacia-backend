import { Injectable } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { SearchMoviesDto } from './dto/search-movies.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getGenres() {
    return this.tmdbService.getMovieGenres();
  }

  async searchMovies(searchMoviesDto: SearchMoviesDto) : Promise<PaginatedResponseDto<any>> {
    return this.tmdbService.discoverMovies(searchMoviesDto);
  }

  async getPopularMovies( paginationDto: PaginationDto) : Promise<PaginatedResponseDto<any>>{
    return this.tmdbService.getPopularMovies(paginationDto.page!, paginationDto.limit!)
  }

  async getMovieDetails(movieId: number) {
    return this.tmdbService.getMovieDetails(movieId);
  }

  async getRecommendations(movieId: number) {
    return this.tmdbService.getMovieRecommendations(movieId);
  }
}
