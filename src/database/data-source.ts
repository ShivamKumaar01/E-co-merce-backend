
import { Address } from 'src/address/entities/address.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();


const isCompiled = __filename.endsWith('.js');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'E-Commerce',
  synchronize: false,
  logging: true,
  entities: [User, Address, Category, Order, OrderItem, Product, Review],
  migrations: [isCompiled ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'],
  
});
