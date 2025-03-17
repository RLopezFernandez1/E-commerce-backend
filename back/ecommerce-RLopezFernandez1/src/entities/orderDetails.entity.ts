import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Products } from './products.entity';
import { Orders } from './orders.entity';

@Entity({
    name: 'ORDER_DETAILS',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false
  })
  price: number;


  @OneToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({
    name: "Order_id",
  })
  order: Orders;

  @ManyToMany(() => Products)
  @JoinTable({
    name: "ORDER_DETAILS_PRODUCTS",
  })
  products: Products[];
}