import { ProductType } from "./product-type.model";

export interface CartProduct {
  id?: number;
  name: string;
  description: string;
  productType: ProductType;
  quantity: number;
  totalQuantity: number;
  price: number;
  imgSrc?: string;
}
