import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { MediaType } from 'generated/prisma/enums';
import { ReviewWithUserDto } from './dto/review-withUser.dto';
import { ReviewResponseDto } from './dto/review-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':mediaType/:tmdbId')
  async findByContent(
    @Param('mediaType') mediaType: MediaType,
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
  ): Promise<ReviewWithUserDto[]> {
    return this.reviewsService.findByContent(tmdbId, mediaType);
  }

  @Post()
  async create(
    @GetUser('id') userId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) : Promise<ReviewWithUserDto>  {
    return this.reviewsService.create(userId, createReviewDto);
  }

  @Get('me/list')
  async findMyReviews(@GetUser('id') userId: string) : Promise<ReviewResponseDto[]> {
    return this.reviewsService.findMyReviews(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') reviewId: string,
    @GetUser('id') userId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) : Promise<ReviewResponseDto>  {
    return this.reviewsService.update(reviewId, userId, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') reviewId: string, @GetUser('id') userId: string) : Promise<{message: string}> {
    return this.reviewsService.remove(reviewId, userId);
  }
}
