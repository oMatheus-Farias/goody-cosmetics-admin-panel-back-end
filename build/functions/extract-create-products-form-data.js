"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCreateProductsFormData = extractCreateProductsFormData;
function extractCreateProductsFormData(formData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const categoryId = formData.get('categoryId');
    const oldPrice = Number(formData.get('oldPrice'));
    const currentPrice = Number(formData.get('currentPrice'));
    const stockQuantity = Number(formData.get('stockQuantity'));
    const image01 = formData.get('image01');
    const image02 = formData.get('image02');
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
