import {ProductEnum} from './enums';

export interface User {
  jwtToken: string;
}

export interface Profile {
  id: number;
  name: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  category: ProductEnum;
}
