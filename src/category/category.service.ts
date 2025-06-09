import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
   @InjectRepository(Category) private readonly categoryRepository:Repository<Category>
  create(createCategoryDto: CreateCategoryDto) {
    const category:Category=new Category()
    category.name=createCategoryDto.name
    // category.categoryType=createCategoryDto.categoryType
    this.categoryRepository.save(category)

    return {message:"category added successfully"};
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
