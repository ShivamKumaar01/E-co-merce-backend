import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepository:Repository<Review>){}
  create(createReviewDto: CreateReviewDto) {
    const review:Review=new Review()
    review.comment=createReviewDto.comment||''
    review.rating=createReviewDto.rating||0
    review.user={id:createReviewDto.userId}as any
    review.product={id:createReviewDto.productId}as any
    return this.reviewRepository.save(review);
    // return 'This action adds a new review';
  }

  findAll() {
    return this.reviewRepository.find({
    relations: ['user', 'product'],
  });
  }

async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

   async remove(id: number) {
    const review = await this.reviewRepository.findOneBy({ id });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return this.reviewRepository.remove(review);
  }
}
