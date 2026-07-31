import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

export enum RfqStatus {
  PENDING = 'pending',
  QUOTED = 'quoted',
  CLOSED = 'closed',
}

@Entity('rfqs')
export class Rfq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', type: 'varchar', length: 30, nullable: true })
  productId: string | null;

  @ManyToOne(() => Product, (product) => product.rfqs, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;

  // Disimpan terpisah agar RFQ tetap punya konteks walau produk dihapus.
  @Column({ name: 'product_name', type: 'varchar', length: 255, nullable: true })
  productName: string | null;

  @Column({ name: 'user_id', type: 'varchar', length: 36, nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (user) => user.rfqs, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({ name: 'buyer_name', type: 'varchar', length: 150 })
  buyerName: string;

  @Column({ name: 'buyer_email', type: 'varchar', length: 191 })
  buyerEmail: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  company: string | null;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({ type: 'enum', enum: RfqStatus, default: RfqStatus.PENDING })
  status: RfqStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
