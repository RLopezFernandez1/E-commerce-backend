import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Users} from './users.entity';
import { OrderDetails } from './orderdetails.entity';

@Entity({
    name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
    user: Users;
}