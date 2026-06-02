import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { MediaType } from "generated/prisma/enums";

export class CreateReviewDto {

  @IsInt()
  @IsNotEmpty({message: 'tmdbId is required'})
  tmdbId: number;

  @IsEnum(MediaType)
  @IsNotEmpty({message: 'MediaType is required'})
  mediaType: MediaType;

  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsString()
  @IsNotEmpty({message: 'Comment is required'})
  comment: string;
}