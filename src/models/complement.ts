import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Group } from './group';
import { Product } from './product';

@Entity()
export class Complement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group, (group) => group.complements)
  @JoinColumn({ name: 'group_id' })
  groups: Group;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  isActive: boolean;

  @ManyToMany(() => Product, (product) => product.complements)
  @JoinTable({
    name: 'product_complements',
    joinColumns: [{ name: 'complement_id' }],
    inverseJoinColumns: [{ name: 'product_id' }]
  })
  products: Product[];
}