export class CreateProductDto {
  name: string;
  description?: string;
  sku: string;
  price: number;
  costPrice?: number;
  stock?: number;
  weight?: number;
  dimensions?: string;
  category?: string;
  brand?: string;
  tags?: string[];
  images?: string[];
  mainImage?: string;
  status?: string;
  featured?: boolean;
  variations?: any;
}