import { Controller, Get } from '@nestjs/common';
import puppeteer = require('puppeteer');
@Controller('crawler')
export class CrawlerController {
  @Get()
  async getItems(): Promise<unknown> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const object = await page.goto(
      'https://apis.naver.com/cafe-web/cafe-search-api/v4.0/trade-search/all?query=%ED%8C%8C%ED%83%80%EA%B3%A0%EB%8B%88%EC%95%84&page=1&size=100&recommendKeyword=true&searchOrderParamType=DEFAULT',
    );
    const products: unknown[] = (await object.json()).result.tradeArticleList;
    products.forEach((product) => {
      console.log(product);
    });
    return await browser.close();
  }
}
