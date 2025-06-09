import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepository:Repository<Order>,
  @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,){}
  async create(createOrderDto: CreateOrderDto) {
    const order = new Order();
    order.user = { id: createOrderDto.userId } as User;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOneBy({ id: item.productId });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;

      orderItems.push(orderItem);
    }

    order.items = orderItems;
    const savedOrder = await this.orderRepository.save(order);

    return savedOrder;
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
