import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { PriceTier } from '../../products/entities/price-tier.entity';
import { CATEGORIES_SEED } from '../data/categories.seed';
import { PRODUCTS_SEED } from '../data/products.seed';

// Mengisi data awal (kategori & produk) hanya jika tabel masih kosong,
// supaya `npm run start` pertama kali langsung ada data tanpa import manual.
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(PriceTier)
    private readonly priceTiersRepository: Repository<PriceTier>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedCategories();
    await this.seedProducts();
  }

  private async seedCategories() {
    const count = await this.categoriesRepository.count();
    if (count > 0) return;

    const categoryIdByName = new Map(
      CATEGORIES_SEED.map((c) => [c.name, c.id]),
    );
    await this.categoriesRepository.save(
      CATEGORIES_SEED.map((c) =>
        this.categoriesRepository.create({ id: c.id, name: c.name, count: c.count }),
      ),
    );
    this.logger.log(`Seed ${CATEGORIES_SEED.length} kategori selesai`);
    return categoryIdByName;
  }

  private async seedProducts() {
    const count = await this.productsRepository.count();
    if (count > 0) return;

    const categoryIdByName = new Map(
      CATEGORIES_SEED.map((c) => [c.name, c.id]),
    );

    for (const p of PRODUCTS_SEED) {
      const categoryId = categoryIdByName.get(p.category) ?? CATEGORIES_SEED[0].id;
      const product = this.productsRepository.create({
        id: p.id,
        name: p.name,
        categoryId,
        image: p.image,
        supplier: p.supplier,
        location: p.location,
        verified: p.verified,
        years: p.years,
        rating: p.rating,
        responseRate: p.responseRate,
        unit: p.unit,
        moq: p.moq,
        priceTiers: p.priceTiers.map((tier) =>
          this.priceTiersRepository.create(tier),
        ),
      });
      await this.productsRepository.save(product);
    }
    this.logger.log(`Seed ${PRODUCTS_SEED.length} produk selesai`);
  }
}
