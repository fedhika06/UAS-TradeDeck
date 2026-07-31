import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { PriceTierInputDto } from './price-tier-input.dto';

export class CreateProductDto {
  @ApiProperty({ description: 'ID unik produk, mis. P-10299' })
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID kategori yang sudah ada, mis. "mesin"' })
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  supplier: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsBoolean()
  verified: boolean;

  @ApiProperty()
  @IsInt()
  @Min(0)
  years: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  rating: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  responseRate: number;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  moq: number;

  @ApiProperty({ type: [PriceTierInputDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PriceTierInputDto)
  priceTiers: PriceTierInputDto[];
}
