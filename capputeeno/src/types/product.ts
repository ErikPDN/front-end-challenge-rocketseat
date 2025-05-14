export interface Product {
  id: string;
  name: string;
  image_url: string;
  price_in_cents: number;
  description?: string;
  category: string;
}

export interface ProductInCart extends Product {
  quantity: number;
}

export interface ProductsFetchResponse {
  data: {
    Product: Product;
  };
}
