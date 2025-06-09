import { OrderItem } from "src/order-item/entities/order-item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Order {
//     @PrimaryGeneratedColumn()
//     id:number

//     @Column()
//     price:number

//     @Column()
//     quantity:number

//     @ManyToOne(()=>User,(user)=>user.order)
//     user:User
// }
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];
}

