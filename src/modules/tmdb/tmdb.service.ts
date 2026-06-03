import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SearchMoviesDto } from '../movies/dto/search-movies.dto';
import { SearchSeriesDto } from '../series/dto/search-series.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

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
      //Lo convierto a promesa
      const response = await firstValueFrom(
        //Devuelve un Observable
        this.httpService.get(`${this.baseUrl}/genre/movie/list`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
          },
        }),
      );

      return response.data.genres;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async discoverMovies(filters: SearchMoviesDto) : Promise<PaginatedResponseDto<any>> {
    try {
      const { genre, page = 1, limit = 10 } = filters;

      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/discover/movie`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
            page,
            sort_by: 'popularity.desc',
            vote_count_gte: 100, //devuelvo peliculas con 100 o mas votos
            ...(genre && { with_genres: genre }),
          },
        }),
      );

      return {
        //Por defecto response.data.results trae 20 pero lo voy a limitar
        data: response.data.results.slice(0, Math.min(limit, 20)),
        meta: {
          page,
          limit,
          total: response.data.total_results,
          totalPages: response.data.total_pages,
        },
      };
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getPopularMovies(page: number, limit: number) : Promise<PaginatedResponseDto<any>> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/popular`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
            page,
          },
        }),
      );

      return {
        data: response.data.results.slice(0, Math.min(limit, 20)),

        meta: {
          page,
          limit,
          total: response.data.total_results,
          totalPages: response.data.total_pages,
        },
      };
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getMovieDetails(movieId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/movie/${movieId}`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
          },
        }),
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

      return response.data.results.slice(0, 10);
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  //Series

  async getSeriesGenres() {
    try {
      const response = await firstValueFrom(
        //Lo convierto a promesa
        this.httpService.get(
          //Devuelve un Observable
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

  async discoverSeries(filters: SearchSeriesDto) : Promise<PaginatedResponseDto<any>> {
    try {
      const { genre, page = 1, limit = 10 } = filters;

      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/discover/tv`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
            page,
            sort_by: 'popularity.desc',
            vote_count_gte: 100, //devuelvo series con 100 o mas votos
            ...(genre && { with_genres: genre }),
          },
        }),
      );

      return {
        //Por defecto response.data.results trae 20 pero lo voy a limitar
        data: response.data.results.slice(0, Math.min(limit, 20)),
        meta: {
          page,
          limit,
          total: response.data.total_results,
          totalPages: response.data.total_pages,
        },
      };
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getPopularSeries(page: number, limit: number) : Promise<PaginatedResponseDto<any>> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/tv/popular`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
            page,
          },
        }),
      );

      return {
        //Por defecto response.data.results trae 20 pero lo voy a limitar
        data: response.data.results.slice(0, Math.min(limit, 20)),

        meta: {
          page,
          limit,
          total: response.data.total_results,
          totalPages: response.data.total_pages,
        },
      };
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getSeriesDetails(seriesId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/tv/${seriesId}`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
          },
        }),
      );

      return response.data;
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  async getSeriesRecommendations(seriesId: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/tv/${seriesId}/recommendations`, {
          headers: this.getHeaders(),
          params: {
            language: 'es-AR',
          },
        }),
      );

      return response.data.results.slice(0, 10);
    } catch (error) {
      this.handleTmdbError(error);
    }
  }

  private handleTmdbError(error: any) : never {
    this.logger.error(error?.response?.data || error.message);

    throw new HttpException('TMDB service unavailable', HttpStatus.BAD_GATEWAY);
  }
}
