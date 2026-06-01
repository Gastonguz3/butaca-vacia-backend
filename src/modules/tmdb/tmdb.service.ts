import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SearchMoviesDto } from '../movies/dto/search-movies.dto';
import { SearchSeriesDto } from '../series/dto/search-series.dto';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger('Tmdb-Service');

  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.getOrThrow<string>('TMDB_BASE_URL');
    this.apiKey = this.configService.getOrThrow<string>('TMDB_API_KEY');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: 'application/json',
    };
  }

  //Movies

  async getMovieGenres() {
    try {
      const response = await firstValueFrom(    //Lo convierto a promesa
        this.httpService.get(                   //Devuelve un Observable
          `${this.baseUrl}/genre/movie/list`,
          {
            headers: this.getHeaders(),
            params: {
              language: 'es-AR',
            },
          },
        ),
      );

      return response.data.genres;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async discoverMovies(filters: SearchMoviesDto) {
    try {
      const params: Record<string, string | number > = {
        language: 'es-AR',
        sort_by: 'popularity.desc',
        vote_count_gte: 100,    //devuelvo peliculas con 100 o mas votos.
      };

      if (filters.genre) {
        params.with_genres = filters.genre;
      }

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/discover/movie`,
          {
            headers: this.getHeaders(),
            params,
          },
        ),
      );

      return response.data.results;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getMovieDetails(movieId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/movie/${movieId}`,
          {
            headers: this.getHeaders(),
            params: {
              language: 'es-AR',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getMovieRecommendations(movieId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/movie/${movieId}/recommendations`,
          {
            headers: this.getHeaders(),
            params: {
              language: 'es-AR',
            },
          },
        ),
      );

      return response.data.results;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  //Series

  async getSeriesGenres() {
    try {
      const response = await firstValueFrom(    //Lo convierto a promesa
        this.httpService.get(                   //Devuelve un Observable
          `${this.baseUrl}/genre/tv/list`,
          {
            headers: this.getHeaders(),
            params: {
              language: 'es-AR',
            },
          },
        ),
      );

      return response.data.genres;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async discoverSeries(filters: SearchSeriesDto) {
    try {
      const params: Record<string, string | number > = {
        language: 'es-AR',
        sort_by: 'popularity.desc',
        vote_count_gte: 100,    //devuelvo series con 100 o mas votos.
      };

      if (filters.genre) {
        params.with_genres = filters.genre;
      }

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/discover/tv`,
          {
            headers: this.getHeaders(),
            params,
          },
        ),
      );

      return response.data.results;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getSeriesDetails(seriesId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/tv/${seriesId}`,
          {
            headers: this.getHeaders(),
            params: {
              language: 'es-AR',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getSeriesRecommendations(seriesId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/tv/${seriesId}/recommendations`,
          {
            headers: this.getHeaders(),
            params: {
              language: 'es-AR',
            },
          },
        ),
      );

      return response.data.results;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  private handleTmdbError(error: any): never {
    this.logger.error(error?.response?.data || error.message);

    throw new HttpException('TMDB service unavailable',HttpStatus.BAD_GATEWAY);
  }
}