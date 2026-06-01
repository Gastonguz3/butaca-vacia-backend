import { IsInt, IsOptional, Min } from 'class-validator';

export class SearchSeriesDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  genre?: number;
}