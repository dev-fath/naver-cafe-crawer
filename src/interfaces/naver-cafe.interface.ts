export interface ProductDetailQueryInterface {
  art: string;
  articleId: number;
  cafeUrl: string;
}

export interface ProductSiblingQueryInterface {
  cafeId: number;
  articleId: number;
  limit: number;
  page: number;
}
