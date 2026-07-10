import { Genre } from "src/common/dto/genre";
import { MovieDto } from "./movie.dto";

export class MovieDetailsDto extends MovieDto {
  //Saga / franquicia
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;

  budget: number;

  genres: Genre[];

  //homepage: string;

  imdb_id: string;

  origin_country: string[];

  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];

  /*production_countries: {
    iso_3166_1: string;
    name: string;
  }[];*/

  revenue: number;

  runtime: number;

  /*spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];*/

  status: string;

  tagline: string; //eslogan
};
