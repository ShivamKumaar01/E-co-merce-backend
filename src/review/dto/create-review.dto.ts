import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsNotEmpty
} from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  comment?: string;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  userId: number; 
}

