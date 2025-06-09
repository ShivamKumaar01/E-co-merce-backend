
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly dataSource: DataSource 
  ) {}


  async create(dto: CreateOrderItemDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: dto.productId },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }
      if (product.quantity < dto.quantity) {
        throw new BadRequestException(`Only ${product.quantity} items left in stock`);
      }
      product.quantity =product.quantity-dto.quantity;
      await queryRunner.manager.save(product);
      const orderItem = new OrderItem();
      orderItem.quantity = dto.quantity;
      orderItem.price = dto.price;
      orderItem.product = { id: dto.productId } as any;
      orderItem.order = { id: dto.orderId } as any;

      await queryRunner.manager.save(orderItem);
      await queryRunner.commitTransaction();
      return orderItem;

    } catch (err) {
    
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.orderItemRepository.find({ relations: ['order', 'product'] });
  }

  async findOne(id: number) {
    return this.orderItemRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    return this.orderItemRepository.update(id, dto);
  }

  async remove(id: number) {
    return this.orderItemRepository.delete(id);
  }
}
