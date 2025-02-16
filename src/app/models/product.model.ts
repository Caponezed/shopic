import { ProductType } from "./productType/product-type.model";

export interface Product {
  id?: number;
  name: string;
  description: string;
  productType: ProductType;
  price: number;
  imgSrc?: string;
}
