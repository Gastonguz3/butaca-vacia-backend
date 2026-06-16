import { IsInt, IsOptional, Min } from 'class-validator';

export class DiscoverSeriesDto {

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
