import { IsInt, IsOptional, Min } from 'class-validator';

export class DiscoverMovieDto {
  //Para usar pagination en los metodos de search
  @IsOptional()
  @IsInt()
  @Min(1)
  genre?: number;

  @IsOptional()
  @IsInt()
  decade?: number;

  @IsOptional()
  @IsInt()
  actorId?: number;

  @IsOptional()
  @IsInt()
  directorId?: number;
}
