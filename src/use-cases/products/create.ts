import sharp from 'sharp';
import { Readable } from 'stream';
import { UTApi } from 'uploadthing/server';

import type {
  CategoriesRepository,
  ProductsRepository,
} from '../../database/repositories/interfaces';
import { AlreadyExistsError, ConflictError, NotFoundError } from '../../errors';
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

    const utapi = new UTApi();

    const compressedFiles = await Promise.all(
      data.imageFiles.map(async (file) => {
        const stream = file.stream();
        const buffer = await this.streamToBuffer(stream as unknown as Readable);
        const compressedBuffer = await sharp(buffer)
          .resize(1024)
          .jpeg({ quality: 80 })
          .toBuffer();

        return {
          ...file,
          buffer: compressedBuffer,
          stream: Readable.from(compressedBuffer),
        };
      }),
    );

    const uploads = await Promise.all(
      compressedFiles.map((file) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/[:.]/g, '-');
        const fileName = `uploaded-file-${formattedDate}.jpg`;

        const fileEsque = new File([file.buffer], fileName, {
          type: file.type,
          lastModified: file.lastModified,
        });

        return utapi.uploadFiles(fileEsque);
      }),
    );

    const imageUrls: string[] = [];
    for (let i = 0; i < uploads.length; i++) {
      imageUrls.push(uploads[i].data?.ufsUrl as string);
    }

    await this.productsRepo
      .create(createdProductData)
      .then(async (product) => {
        await this.productsRepo.createImages(product.id, { imageUrls });
      })
      .catch(() => {
        throw new ConflictError('Error creating product');
      });
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    if (!stream || typeof stream[Symbol.asyncIterator] !== 'function') {
      console.error('Invalid stream provided:', stream);
      throw new TypeError(
        'The provided stream is not a valid Readable stream.',
      );
    }

    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }
}
