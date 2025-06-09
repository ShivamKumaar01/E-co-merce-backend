
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Between, ILike, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const { name, price, quantity, description, categoryIds } = createProductDto;

    const product = new Product();
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.description = description || '';


    const categories = await this.categoryRepository.findByIds(categoryIds);

    if (categories.length !== categoryIds.length) {
      throw new NotFoundException('One or more categories not found');
    }

    product.categories = categories;

    return this.productRepository.save(product);
  }

  async findAll(query: any) {
    const { name, minPrice, maxPrice, page = 1, limit = 10 } = query;

    const where: any = {};

    if (name) {
      where.name = ILike(`%${name}%`);
    }

    if (minPrice && maxPrice) {
      where.price = Between(+minPrice, +maxPrice);
    } else if (minPrice) {
      where.price = Between(+minPrice, Number.MAX_SAFE_INTEGER);
    } else if (maxPrice) {
      where.price = Between(0, +maxPrice);
    }

    const take = +limit;
    const skip = (+page - 1) * take;

    const [data, total] = await this.productRepository.findAndCount({
      where,
      take,
      skip,
      relations: ['categories'],
    });

    return {
      data,
      total,
      page: +page,
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const { name, price, quantity, description, categoryIds } = updateProductDto;

    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (description !== undefined) product.description = description;


    if (categoryIds && categoryIds.length > 0) {
      const categories = await this.categoryRepository.findByIds(categoryIds);
      if (categories.length !== categoryIds.length) {
        throw new NotFoundException('One or more categories not found');
      }
      product.categories = categories;
    }

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.productRepository.remove(product);
  }
}

