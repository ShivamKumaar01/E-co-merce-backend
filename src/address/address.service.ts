import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
     @InjectRepository(Address) private readonly addressRepository:Repository<Address>
  ){}
  create(createAddressDto: CreateAddressDto) {
    const address:Address=new Address()
    address.street=createAddressDto.street
    address.city=createAddressDto.city,
    address.state=createAddressDto.state,
    address.postalCode=createAddressDto.postalCode
    address.user={id:createAddressDto.userId}as any;
    this.addressRepository.save(address)
    return {message:"address added successfully"}
  }

   async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? [
          { city: ILike(`%${search}%`) },
          { state: ILike(`%${search}%`) }
        ]
      : {};

    const [data, total] = await this.addressRepository.findAndCount({
      where,
      skip,
      take: limit,
    });

    return {
      
      data,
      page,
      limit,
      total,
    };
  }

  findOne(id: number) {
    return this.addressRepository.findOneBy({id});
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
