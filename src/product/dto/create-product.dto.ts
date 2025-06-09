import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsOptional()
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];
}

