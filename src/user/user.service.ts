import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>

  ) { }
  create(createUserDto: CreateUserDto) {
    const user: User = new User()
    user.name = createUserDto.name
    user.email = createUserDto.email
    user.password = createUserDto.password
    user.gender = createUserDto.gender
    user.age = createUserDto.age
    return this.userRepository.save(user)
  }

  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? { name: ILike(`%${search}%`) }
      : {};
    const [users, total] = await this.userRepository.findAndCount({
      where: whereClause,
      skip,
      take: limit,
      order: { id: 'ASC' }
    })
    return {
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    }
  }
  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const value = this.userRepository.update({ id }, { ...updateUserDto })
    return { message: "user updated successfully" }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
