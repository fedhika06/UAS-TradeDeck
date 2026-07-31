import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PriceTier } from './entities/price-tier.entity';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(PriceTier)
    private readonly priceTiersRepository: Repository<PriceTier>,
  ) {}

  async findAll(query: FindProductsQueryDto): Promise<Product[]> {
    const qb = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.priceTiers', 'priceTiers')
      .leftJoinAndSelect('product.category', 'category');

    if (query.category) {
      qb.andWhere('category.id = :category', { category: query.category });
    }

    if (query.q) {
      qb.andWhere('(product.name LIKE :term OR product.supplier LIKE :term)', {
        term: `%${query.q}%`,
      });
    }

    if (query.sort === 'rating_desc') {
      qb.orderBy('product.rating', 'DESC');
    }

    const products = await qb.getMany();

    if (query.sort === 'price_asc') {
      products.sort((a, b) => this.lowestPrice(a) - this.lowestPrice(b));
    }

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['priceTiers', 'category'],
    });
    if (!product) {
      throw new NotFoundException(`Produk dengan id "${id}" tidak ditemukan`);
    }
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      id: dto.id,
      name: dto.name,
      categoryId: dto.categoryId,
      image: dto.image,
      supplier: dto.supplier,
      location: dto.location,
      verified: dto.verified,
      years: dto.years,
      rating: dto.rating,
      responseRate: dto.responseRate,
      unit: dto.unit,
      moq: dto.moq,
      priceTiers: dto.priceTiers.map((tier) =>
        this.priceTiersRepository.create(tier),
      ),
    });
    return this.productsRepository.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, {
      name: dto.name ?? product.name,
      categoryId: dto.categoryId ?? product.categoryId,
      image: dto.image ?? product.image,
      supplier: dto.supplier ?? product.supplier,
      location: dto.location ?? product.location,
      verified: dto.verified ?? product.verified,
      years: dto.years ?? product.years,
      rating: dto.rating ?? product.rating,
      responseRate: dto.responseRate ?? product.responseRate,
      unit: dto.unit ?? product.unit,
      moq: dto.moq ?? product.moq,
    });

    if (dto.priceTiers) {
      // Ganti seluruh price tier lama dengan yang baru dikirim client.
      await this.priceTiersRepository.delete({ productId: id });
      product.priceTiers = dto.priceTiers.map((tier) =>
        this.priceTiersRepository.create({ ...tier, productId: id }),
      );
    }

    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  private lowestPrice(product: Product): number {
    return Math.min(...product.priceTiers.map((t) => Number(t.price)));
  }
}
