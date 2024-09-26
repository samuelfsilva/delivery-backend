import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Store } from './store';
import { User } from './user';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Store, (store) => store.addresses)
  @JoinTable({
    name: 'store_addresses',
    joinColumns: [{ name: 'address_id' }],
    inverseJoinColumns: [{ name: 'store_id' }]
  })
  stores: Store[];

  @ManyToMany(() => User, (user) => user.addresses)
  @JoinTable({
    name: 'user_addresses',
    joinColumns: [{ name: 'address_id' }],
    inverseJoinColumns: [{ name: 'user_id' }]
  })
  users: User[];

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column()
  postalCode: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ type: 'varchar', nullable: true })
  complement: string | null;

  @Column({ type: 'varchar', nullable: true })
  reference: string | null;
}
