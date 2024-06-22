export interface Product {
  product_id: number;
  category_id: number;
  product_name: string;
  description: string;
  quantity: number;
  price: number;
  image_url: string;
  status: 'available' | 'out_of_stock' | 'discontinued';
  age: number;
  weight: number;
  placeOfProduction: string;
  warranty: 'no_warranty' | '6_months' | '1_year' | '2_years';
  brandOfOrigin: string;
  numberOfSale: number;
  ingredient: string;
  outstandingFeatures: string;
  userManual: string;
  createdAt: string;
  updatedAt: string;
  updatedAt: string;
}
