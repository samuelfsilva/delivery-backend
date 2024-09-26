import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Seller } from './seller';
import { Address } from './addresses';
import { Sale } from './sale';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Seller)
  seller: Seller;

  @ManyToMany(() => Address, (address) => address.users)
  @JoinTable({
    name: 'user_addresses',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'address_id' }]
  })
  addresses: Address[];

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  birthdate: Date;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;
}
