import { Controller, Get, Query } from '@nestjs/common';
import { CrawlingService } from '../../services/crawling/crawling.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private crawlingService: CrawlingService) {}
  @Get()
  async getItems(@Query() query: { keyword: string }): Promise<unknown> {
    const itemResult = await this.crawlingService.getProductLists(query);
    console.log(itemResult);
    return itemResult;
  }

  openLink = () => {
    //https://cafe.naver.com/chocammall/7645494?art=aW50ZXJuYWwtY2FmZS13ZWItc2VjdGlvbi1zZWFyY2gtbGlzdA.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYWZlVHlwZSI6IkNBRkVfSUQiLCJhcnRpY2xlSWQiOjc2NDU0OTQsImlzc3VlZEF0IjoxNjUxNDczNjYwNTc3LCJjYWZlSWQiOjIwNDg2MTQ1fQ.TmznJsZ2dCibzqKGhw9w28zzjWzwoWHcYzpDRDn0anE
    return `cafe.naver.com/cafeUrl/articleId?art=product.art`;
  };
}
