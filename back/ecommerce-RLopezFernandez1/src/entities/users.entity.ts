import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Orders } from './orders.entity';

@Entity({
    name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
    })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false
  })
  email: string;

  @Column({type: "bigint", nullable: false})
  age: number

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;

  @Column({
    type: 'int',
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 50,
    })
  country: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  city: string;

@Column({
    type: "boolean",
    default: false
    })
    isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({
    name: 'orders_id',
  })
  orders: Orders[];
}