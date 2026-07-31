import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

// Tabel jenjang harga grosir (bertingkat sesuai kuantitas pembelian).
@Entity('price_tiers')
export class PriceTier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'varchar', length: 30 })
  productId: string;

  @ManyToOne(() => Product, (product) => product.priceTiers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  min: number;

  @Column({ type: 'int', nullable: true })
  max: number | null;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;
}
