import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderdetails.entity';

@Entity({
    name: 'PRODUCTS',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({ 
    type: 'text',
    nullable: false
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false 
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false
  })
  stock: number;

  @Column({
    type: 'text',
    nullable: false,
    default: 'https://previews.123rf.com/images/shtanzman/shtanzman1302/shtanzman130200032/17989919-monitor-de-la-computadora-laptop-tablet-pc-m%C3%B3vil-y-smartphone-con-una-pantalla-azul-aislado-en.jpg'
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
  })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[];
}