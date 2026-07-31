import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class PriceTierInputDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  min: number;

  @ApiPropertyOptional({ nullable: true, description: 'null berarti tanpa batas atas' })
  @IsOptional()
  @IsInt()
  max?: number | null;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
}
