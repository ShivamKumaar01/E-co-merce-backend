import {
  IsArray,
  IsInt,
  IsNotEmpty,
  Min,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemInput {
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items: OrderItemInput[];
}

