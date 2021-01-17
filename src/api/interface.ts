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
  price: string;
  quantity: number;
}

export interface Food extends Product {
  description: string;
  weight: string;
}

export interface Drink extends Product {
  volume: string;
}
