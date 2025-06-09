import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Address {
//     @PrimaryGeneratedColumn()
//     id:number

//     @Column()
//     location:string

//     @Column()
//     state:string

//     @Column()
//     pin:number


//     @ManyToOne(()=>User,(user)=>user.address)
//     user:User

// }
@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: number;

  @ManyToOne(() => User, user => user.addresses)
  user: User;
}

