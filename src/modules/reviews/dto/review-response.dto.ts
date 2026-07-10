import { MediaType } from 'generated/prisma/enums';

export class ReviewResponseDto {
  id: string;
  rating: number;
  comment: string;
  tmdbId: number;
  mediaType: MediaType;
  titleShow: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
