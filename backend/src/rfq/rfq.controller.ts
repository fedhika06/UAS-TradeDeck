import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RfqService } from './rfq.service';
import { CreateRfqDto } from './dto/create-rfq.dto';
import { Rfq } from './entities/rfq.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('rfq')
@Controller('rfq')
export class RfqController {
  constructor(private readonly rfqService: RfqService) {}

  @Post()
  @ApiCreatedResponse({ description: 'RFQ berhasil dibuat dan diteruskan ke pemasok terkait (tidak perlu login)' })
  create(@Body() dto: CreateRfqDto): Promise<Rfq> {
    return this.rfqService.create(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Daftar semua RFQ (dashboard internal, butuh login)' })
  findAll(): Promise<Rfq[]> {
    return this.rfqService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Detail satu RFQ (butuh login)' })
  findOne(@Param('id') id: string): Promise<Rfq> {
    return this.rfqService.findOne(id);
  }
}
