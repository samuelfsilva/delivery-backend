import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Store } from './store';
import { User } from './user';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @OneToMany(() => Store, (store) => store.seller)
  store: Store;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: false })
  documentNumber: string;

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean;
}
