import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { PriceTier } from './price-tier.entity';
import { Rfq } from '../../rfq/entities/rfq.entity';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  // FK ke categories.id
  @Column({ name: 'category_id', type: 'varchar', length: 50 })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', length: 500 })
  image: string;

  @Column({ type: 'varchar', length: 255 })
  supplier: string;

  @Column({ type: 'varchar', length: 150 })
  location: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'int', default: 0 })
  years: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ name: 'response_rate', type: 'int', default: 0 })
  responseRate: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'int' })
  moq: number;

  @OneToMany(() => PriceTier, (tier) => tier.product, {
    cascade: true,
    eager: true,
  })
  priceTiers: PriceTier[];

  @OneToMany(() => Rfq, (rfq) => rfq.product)
  rfqs: Rfq[];
}
