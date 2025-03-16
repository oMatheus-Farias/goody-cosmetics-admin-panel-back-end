import type {
  CategoriesRepository,
  ProductsRepository,
} from '../../database/repositories/interfaces';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { ConflictError } from '../../errors/conflict-error';
import type { IProductsDto } from './dtos/products-dto';

export class CreateProductsUseCase {
  constructor(
    private readonly productsRepo: ProductsRepository,
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async execute(data: IProductsDto): Promise<void> {
    const product = await this.productsRepo.findByName(data.name);

    if (product) {
      throw new AlreadyExistsError('Product already exists');
    }

    const category = await this.categoriesRepo.findById(data.categoryId);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const createdProductData = {
      name: data.name,
      description: data.description,
      categories: {
        connect: {
          id: data.categoryId,
        },
      },
      oldPrice: data.oldPrice,
      currentPrice: data.currentPrice,
      stockQuantity: data.stockQuantity,
    };

    //TODO: Add return product when created
    await this.productsRepo
      .create(createdProductData)
      .then(async () => {
        const productCreated = await this.productsRepo.findByName(data.name);

        const imageUrls = [data.imageUrl01, data.imageUrl02];

        await this.productsRepo.createImages(productCreated!.id, {
          imageUrls,
        });
      })
      .catch(() => {
        throw new ConflictError('Error creating product');
      });
  }
}
