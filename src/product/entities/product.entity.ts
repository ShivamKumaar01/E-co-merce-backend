import { Category } from "src/category/entities/category.entity";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { Review } from "src/review/entities/review.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Category, category => category.products)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];
}

