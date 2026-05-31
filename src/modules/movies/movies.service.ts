import { Injectable } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { SearchMoviesDto } from './dto/search-movies.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getGenres() {
    return this.tmdbService.getMovieGenres();
  }

  async searchMovies(searchMoviesDto: SearchMoviesDto) {
    const { genre } = searchMoviesDto;  //Mas adelante agregare el resto

    return this.tmdbService.discoverMovies({genre});
  }

  async getMovieDetails(movieId: number) {
    return this.tmdbService.getMovieDetails(movieId);
  }

  async getRecommendations(movieId: number) {
    return this.tmdbService.getMovieRecommendations(movieId);
  }
}
