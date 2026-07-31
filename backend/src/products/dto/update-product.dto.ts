import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

// Semua field opsional untuk PATCH/PUT sebagian data produk.
export class UpdateProductDto extends PartialType(CreateProductDto) {}
