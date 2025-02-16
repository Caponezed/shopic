import { ProductType } from "./product-type.model";

export interface Product {
  id?: number;
  name: string;
  description: string;
  productType: ProductType;
  totalQuantity: number;
  price: number;
  imgSrc?: string;
}
