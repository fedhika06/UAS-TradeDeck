import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindProductsQueryDto {
  @ApiPropertyOptional({ description: 'Filter berdasarkan nama kategori persis' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Kata kunci pencarian (nama produk / pemasok)' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    description: 'Urutan hasil',
    enum: ['relevance', 'price_asc', 'rating_desc'],
  })
  @IsOptional()
  @IsIn(['relevance', 'price_asc', 'rating_desc'])
  sort?: 'relevance' | 'price_asc' | 'rating_desc';
}
