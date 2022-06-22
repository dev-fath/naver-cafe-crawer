import { Controller, Get, Query } from '@nestjs/common';
import { ProductDetailQueryInterface } from '../../interfaces/naver-cafe.interface';
import { ProductService } from '../../services/crawling/product.service';

@Controller('product')
export class ProductController {
  constructor(private naverCafeProductService: ProductService) {}
  @Get('/naver-product-detail')
  async productDetail(@Query() query: ProductDetailQueryInterface): Promise<unknown> {
    return this.naverCafeProductService.naverCafeProduct(query);
  }
}
