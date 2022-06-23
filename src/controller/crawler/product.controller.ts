import { Controller, Get, Query } from '@nestjs/common';
import { ProductDetailQueryInterface, ProductSiblingQueryInterface } from '../../interfaces/naver-cafe.interface';
import { ProductService } from '../../services/crawling/product.service';

@Controller('product')
export class ProductController {
  constructor(private naverCafeProductService: ProductService) {}
  @Get('/naver-product-detail')
  async productDetail(@Query() query: ProductDetailQueryInterface): Promise<unknown> {
    return this.naverCafeProductService.naverCafeProduct(query);
  }
  @Get('/naver-product-siblings')
  async productSiblings(@Query() query: ProductSiblingQueryInterface): Promise<unknown> {
    return this.naverCafeProductService.naverCafeProductSiblings(query);
  }
}
