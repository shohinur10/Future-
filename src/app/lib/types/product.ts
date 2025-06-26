import { ProductCategory, ProductColor, ProductMaterial, ProductStatus, ProductStyle } from "../enums/product.enum";




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
  productMaterial: ProductMaterial;
  productColor: ProductColor;
  productStyle: ProductStyle;
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
