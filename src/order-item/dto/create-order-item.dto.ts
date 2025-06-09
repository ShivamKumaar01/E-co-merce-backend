
import { IsInt, Min, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  orderId: number;
}

