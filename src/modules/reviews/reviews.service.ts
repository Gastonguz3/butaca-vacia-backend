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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMyReviews(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<ReviewResponseDto>> {
    const { page = 1, limit = 10 } = paginationDto;

    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),

      this.prisma.review.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      data: reviews,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByContent(
    tmdbId: number,
    mediaType: MediaType,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<ReviewWithUserDto>> {
    const { page = 1, limit = 10 } = paginationDto;

    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
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
        skip,
        take: limit,
      }),

      this.prisma.review.count({
        where: {
          tmdbId,
          mediaType,
        },
      }),
    ]);

    return {
      data: reviews,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(
    userId: string,
    createDto: CreateReviewDto,
  ): Promise<ReviewWithUserDto> {
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

  async update(
    reviewId: string,
    userId: string,
    reviewDto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
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

  async remove(reviewId: string, userId: string): Promise<{ message: string }> {
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
