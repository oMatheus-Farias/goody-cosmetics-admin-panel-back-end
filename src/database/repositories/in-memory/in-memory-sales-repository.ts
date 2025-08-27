import { randomBytes } from 'node:crypto';

import type { Sale, SaleItem } from '@prisma/client';

import type {
  ICreateSalesDto,
  IUpdateSalesDto,
} from '../../../use-cases/sales/dtos';
import type { SalesRepository, SalesTFindAllWithParams } from '../interfaces';

interface ISalesData {
  id: string;
  saleDate: Date;
  totalPrice: number;
  items: {
    saleItemId: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export class InMemorySalesRepository implements SalesRepository {
  public items: ISalesData[] = [];

  async findById(saleId: string): Promise<ISalesData | null> {
    return this.items.find((sale) => sale.id === saleId) || null;
  }
  async findByProductId(productId: string): Promise<{ id: string } | null> {
    const sale = this.items.find((sale) =>
      sale.items.some((item) => item.productId === productId),
    );

    if (!sale) {
      return null;
    }

    return {
      id: sale.id,
    };
  }
  async findSalesItemsById(saleItemId: string): Promise<SaleItem | null> {
    const sale = this.items.find((sale) =>
      sale.items.some((item) => item.saleItemId === saleItemId),
    );

    if (!sale) {
      return null;
    }

    const saleItem =
      sale.items.find((item) => item.saleItemId === saleItemId) || null;

    return {
      id: saleItem?.saleItemId as string,
      saleId: sale.id,
      productId: saleItem?.productId as string,
      quantity: saleItem?.quantity as number,
      unitPrice: saleItem?.unitPrice as number,
      createdAt: new Date(),
    };
  }
  async findSaleItemsBySaleId(saleId: string): Promise<SaleItem[] | null> {
    const sale = this.items.find((sale) => sale.id === saleId);

    if (!sale) {
      return null;
    }

    return sale.items.map((item) => ({
      id: item.saleItemId,
      saleId: sale.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      createdAt: new Date(),
    }));
  }
  async findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<SalesTFindAllWithParams> {
    const sales = searchTerm
      ? this.items.filter((sale) =>
          sale.items.some((item) => item.productName.includes(searchTerm)),
        )
      : this.items;

    return {
      sales,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: 10,
        totalCount: sales.length,
      },
    };
  }
  async create(data: ICreateSalesDto): Promise<Pick<Sale, 'id'>> {
    const saleItems = data.items.map((item) => ({
      saleItemId: randomBytes(16).toString('hex'),
      productId: item.productId,
      productName: `Product-${item.productId}`,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    const sale = {
      id: randomBytes(16).toString('hex'),
      saleDate: data.saleDate,
      items: saleItems,
      totalPrice: 0,
    };

    this.items.push(sale);

    return { id: sale.id };
  }
  async update(data: IUpdateSalesDto): Promise<void> {
    const sale = this.items.find((sale) => sale.id === data.saleId);

    if (!sale) {
      throw new Error('Sale not found');
    }

    if (data.saleDate) {
      sale.saleDate = data.saleDate;
    }

    if (data.items && data.items.length > 0) {
      for (let i = 0; i < data!.items!.length; i++) {
        const saleItem = sale.items.find(
          (item) => item.saleItemId === data.items?.[i]?.saleItemId,
        );

        if (!saleItem) {
          throw new Error('Sale Item not found');
        }

        if (data.items[i].quantity) {
          saleItem.quantity = data.items[i].quantity as number;
        }
        if (data.items[i].unitPrice) {
          saleItem.unitPrice = data.items[i].unitPrice as number;
        }
      }
    }
  }
  async deleteSaleItems(saleItemId: string): Promise<void> {
    const sale = this.items.find((sale) =>
      sale.items.some((item) => item.saleItemId === saleItemId),
    );

    if (!sale) {
      throw new Error('Sale not found');
    }

    sale.items = sale.items.filter((item) => item.saleItemId !== saleItemId);
  }
  async deleteSales(saleId: string): Promise<void> {
    this.items = this.items.filter((sale) => sale.id !== saleId);
  }
}
