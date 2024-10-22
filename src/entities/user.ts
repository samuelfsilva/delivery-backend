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

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: false })
  birthdate: Date;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean;
}
