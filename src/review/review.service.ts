import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }
  create(createReviewDto: CreateReviewDto) {
    const review: Review = new Review()
    review.comment = createReviewDto.comment || ''
    review.rating = createReviewDto.rating || 0
    review.user = { id: createReviewDto.userId } as any
    review.product = { id: createReviewDto.productId } as any
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

async getProductsSortedByRating() {
    const reviews = await this.reviewRepository.find({
      relations: ['product'],
    });


    const grouped = new Map<number, { product: any; ratings: number[] }>();

    for (const review of reviews) {
      const productId = review.product.id;
      if (!grouped.has(productId)) {
        grouped.set(productId, { product: review.product, ratings: [] });
      }
      grouped.get(productId)!.ratings.push(review.rating);
    }

   
    const productsWithAvgRating = Array.from(grouped.values()).map((entry) => {
      const total = entry.ratings.reduce((a, b) => a + b, 0);
      const avgRating = total / entry.ratings.length;
      return {
        product: entry.product,
        avgRating: parseFloat(avgRating.toFixed(2)),
      };
    });

    productsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);

    return productsWithAvgRating;
  }
}
