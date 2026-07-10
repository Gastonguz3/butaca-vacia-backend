import { Genre } from "src/common/dto/genre";
import { SeriesDto } from "./series.dto";

export class SeriesDetailsDto extends SeriesDto{
  created_by: {
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  genres: Genre[];
  networks: {   //Canales que lo emite o emitio
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;

  production_companies: {   //Empresas que produjeron la serie
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];

  /*production_countries: {
    iso_3166_1: string;
    name: string;
  }[];*/

  seasons: {
    id: number;
    name: string;
    air_date: string;
    episode_count: number;
    poster_path: string | null;
    season_number: number;
  }[];
};
