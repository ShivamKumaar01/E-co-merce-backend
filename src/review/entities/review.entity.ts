import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['user', 'product']) 
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number; 

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

