import { MediaType } from "generated/prisma/enums";

export class ReviewWithUserDto {
  id: string;
  rating: number;
  comment: string;
  tmdbId: number;
  mediaType: MediaType;
  createdAt: Date;
  updatedAt: Date;

  user: {
    id: string;
    username: string;
  };
}