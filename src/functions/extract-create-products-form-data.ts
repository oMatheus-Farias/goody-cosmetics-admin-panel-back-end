export function extractCreateProductsFormData(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const categoryId = formData.get('categoryId') as string;
  const oldPrice = Number(formData.get('oldPrice'));
  const currentPrice = Number(formData.get('currentPrice'));
  const stockQuantity = Number(formData.get('stockQuantity'));
  const image01 = formData.get('image01') as File;
  const image02 = formData.get('image02') as File;

  return {
    name,
    description,
    categoryId,
    oldPrice,
    currentPrice,
    stockQuantity,
    image01,
    image02,
  };
}
