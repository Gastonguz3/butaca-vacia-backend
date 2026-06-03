import { IsInt, IsOptional, Min } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class SearchSeriesDto extends PaginationDto {  //Para usar pagination en los metodos de search
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