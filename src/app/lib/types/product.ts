import { ProductCategory, ProductStatus, ProductMaterialType, ProductStyleType } from '../enums/product.enum';




export interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productMaterialType: ProductMaterialType;
  productStyleType: ProductStyleType;
  createdAt: Date;
  updatedAt: Date;
}


export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  search?: string;
  productCategory?: ProductCategory;
}
