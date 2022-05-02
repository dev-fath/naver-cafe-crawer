import { Injectable } from '@nestjs/common';
import puppeteer = require('puppeteer');

@Injectable()
export class CrawlingService {
  getProductLists = async ({ keyword }: { keyword: string }) => {
    const itemResult = { products: [], count: 0 };
    const queries = { itemSize: 10, pageNumber: 1, keyword: keyword };
    let loadedItems = await this.loadArticles(queries);
    itemResult.count = loadedItems.count;
    while (queries.itemSize >= loadedItems.products.length) {
      itemResult.products.push(...loadedItems.products);
      if (loadedItems.products.length !== queries.itemSize) {
        console.log(queries.itemSize, loadedItems.products.length);
        break;
      }
      queries.pageNumber++;
      loadedItems = await this.loadArticles(queries);
    }
    return itemResult;
  };

  loadArticles = async (queries: { itemSize: number; pageNumber: number; keyword: string }) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pageObject = await page.goto(
      `https://apis.naver.com/cafe-web/cafe-search-api/v4.0/trade-search/all?query=${queries.keyword}&page=${queries.pageNumber}&size=${queries.itemSize}&recommendKeyword=true&searchOrderParamType=DEFAULT&transactionStatuses=ON_SALE`,
    );
    const { tradeArticleList, totalCount }: { tradeArticleList: unknown[]; totalCount: number } = (
      await pageObject.json()
    ).result;
    await browser.close();

    return { products: tradeArticleList, count: totalCount };
  };
}
