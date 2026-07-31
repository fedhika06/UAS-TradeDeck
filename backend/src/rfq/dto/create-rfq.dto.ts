import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateRfqDto {
  @ApiPropertyOptional({ description: 'ID produk yang diminta, jika RFQ berasal dari kartu produk' })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional({ description: 'Nama produk (untuk RFQ bebas tanpa productId)' })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiProperty({ description: 'Nama pembeli' })
  @IsString()
  @IsNotEmpty()
  buyerName: string;

  @ApiProperty({ description: 'Email pembeli untuk dihubungi pemasok' })
  @IsEmail()
  buyerEmail: string;

  @ApiPropertyOptional({ description: 'Nama perusahaan pembeli' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ description: 'Jumlah yang dibutuhkan (dalam satuan produk)' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ description: 'Catatan tambahan / spesifikasi khusus' })
  @IsOptional()
  @IsString()
  message?: string;
}
