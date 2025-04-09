export interface ImageType {
  id: number;
  image: string;
}

export interface CategoryType {
  id: number;
  title: string;
}

export interface ProductType {
  id: number;
  title: string;
  descriptions: string;
  price: number;
  category: string;
  images: ImageType[];
}

export interface Props {
  searchParams: Promise<{ id?: string }>;
}
