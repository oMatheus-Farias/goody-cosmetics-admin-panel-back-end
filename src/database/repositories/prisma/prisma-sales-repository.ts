import type { SaleItem } from '@prisma/client';

import { prisma } from '../../../app';
import type {
  ICreateSalesDto,
  IUpdateSalesDto,
} from '../../../use-cases/sales/dtos';
import type { ISalesData } from '../../../use-cases/sales/interfaces/return-sales-data';
import type { SalesRepository, SalesTFindAllWithParams } from '../interfaces';

export class PrismaSalesRepository implements SalesRepository {
  async findById(saleId: string): Promise<ISalesData | null> {
    const sale = await prisma.sale.findUnique({
      where: {
        id: saleId,
      },
      select: {
        id: true,
        saleDate: true,
        saleItem: {
          select: {
            id: true,
            quantity: true,
            unitPrice: true,
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!sale) {
      return null;
    }

    return {
      id: sale.id,
      saleDate: sale.saleDate,
      totalPrice: sale.saleItem.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
      ),
      items: sale.saleItem.map((item) => ({
        saleItemId: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        productName: item.product.name,
      })),
    };
  }
  async findSalesItemsById(saleItemId: string): Promise<SaleItem | null> {
    return await prisma.saleItem.findUnique({
      where: {
        id: saleItemId,
      },
    });
  }
  async findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<SalesTFindAllWithParams> {
    const sales = (
      await prisma.sale.findMany({
        skip: page * 10,
        take: 10,
        select: {
          id: true,
          saleDate: true,
          saleItem: {
            select: {
              id: true,
              quantity: true,
              unitPrice: true,
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: {
          saleItem: {
            some: {
              product: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
      })
    ).map((sale) => ({
      id: sale.id,
      saleDate: sale.saleDate,
      totalPrice: sale.saleItem.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
      ),
      items: sale.saleItem.map((item) => ({
        saleItemId: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        productName: item.product.name,
      })),
    }));

    const count = await prisma.sale.count({
      skip: page * 10,
      take: 10,
      where: {
        saleItem: {
          some: {
            product: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        },
      },
    });

    const totalCount = await prisma.sale.count({
      where: {
        saleItem: {
          some: {
            product: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        },
      },
    });

    return {
      sales,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: count,
        totalCount,
      },
    };
  }
  async create(data: ICreateSalesDto): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          saleDate: data.saleDate,
        },
      });

      const items = data.items.map((item) => {
        return tx.saleItem.create({
          data: {
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            productId: item.productId,
            saleId: sale.id,
          },
        });
      });

      await Promise.all(items);
    });
  }
  async update(data: IUpdateSalesDto): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.sale.update({
        where: {
          id: data.saleId,
        },
        data: {
          saleDate: data.saleDate,
        },
      });

      if (data.items) {
        const items = data.items.map((item) => {
          return tx.saleItem.update({
            where: {
              id: item.saleItemId,
              saleId: data.saleId,
            },
            data: {
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            },
          });
        });
        await Promise.all(items);
      }
    });
  }
  async deleteSaleItems(saleItemId: string): Promise<void> {
    await prisma.saleItem.delete({
      where: {
        id: saleItemId,
      },
    });
  }
  async deleteSales(saleId: string): Promise<void> {
    await prisma.sale.delete({
      where: {
        id: saleId,
      },
    });
  }
}
