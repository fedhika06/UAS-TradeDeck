import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rfq } from './entities/rfq.entity';
import { CreateRfqDto } from './dto/create-rfq.dto';

@Injectable()
export class RfqService {
  constructor(
    @InjectRepository(Rfq)
    private readonly rfqRepository: Repository<Rfq>,
  ) {}

  create(dto: CreateRfqDto, userId?: string): Promise<Rfq> {
    const rfq = this.rfqRepository.create({
      ...dto,
      productId: dto.productId ?? null,
      productName: dto.productName ?? null,
      company: dto.company ?? null,
      message: dto.message ?? null,
      userId: userId ?? null,
    });
    return this.rfqRepository.save(rfq);
  }

  findAll(): Promise<Rfq[]> {
    return this.rfqRepository.find({
      relations: ['product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Rfq> {
    const rfq = await this.rfqRepository.findOne({
      where: { id },
      relations: ['product', 'user'],
    });
    if (!rfq) {
      throw new NotFoundException(`RFQ dengan id "${id}" tidak ditemukan`);
    }
    return rfq;
  }
}
