import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediaType } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewWithUserDto } from './dto/review-withUser.dto';
import { ReviewResponseDto } from './dto/review-response.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByContent(
    tmdbId: number,
    mediaType: MediaType,
  ): Promise<ReviewWithUserDto[]> {
    return await this.prisma.review.findMany({
      where: {
        tmdbId,
        mediaType,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(userId: string, createDto: CreateReviewDto) : Promise<ReviewWithUserDto> {
    return await this.prisma.review.create({
      data: {
        userId,
        tmdbId: createDto.tmdbId,
        mediaType: createDto.mediaType,
        rating: createDto.rating,
        comment: createDto.comment,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findMyReviews(userId: string) : Promise<ReviewResponseDto[]> {
    return await this.prisma.review.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(reviewId: string, userId: string, reviewDto: UpdateReviewDto) : Promise<ReviewResponseDto> {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('Incorrect Review');
    }

    return await this.prisma.review.update({
      where: {
        id: reviewId,
      },
      data: reviewDto,
    });
  }

  async remove(reviewId: string, userId: string) : Promise<{message: string}> {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('Incorrect Review');
    }

    await this.prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return {
      message: 'Review deleted successfully',
    };
  }
}
