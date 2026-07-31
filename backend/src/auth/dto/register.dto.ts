import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Nama lengkap pengguna' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email untuk login' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (minimal 6 karakter)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ description: 'Nama perusahaan pembeli' })
  @IsOptional()
  @IsString()
  company?: string;
}
