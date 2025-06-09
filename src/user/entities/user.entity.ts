import { Address } from "src/address/entities/address.entity";
import { Order } from "src/order/entities/order.entity";
import { Review } from "src/review/entities/review.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @CreateDateColumn({nullable:true})
  createdAt: Date;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[]

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  
  @OneToMany(() => Review, review => review.user)
  reviews: Review[];
}
