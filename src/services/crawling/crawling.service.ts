import { Injectable } from '@nestjs/common';
import puppeteer = require('puppeteer');
import { Page } from 'puppeteer';
import { BunjangProduct, BunjangProps } from '../../interfaces/bunjang.interface';

@Injectable()
export class CrawlingService {
  getNaverProductLists = async ({ keyword }: { keyword: string }) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const itemResult = { products: [], count: 0 };
    const queries = { itemSize: 10, pageNumber: 1, keyword: keyword };
    let loadedItems = await this.loadArticles(queries, page);
    itemResult.count = loadedItems.count;
    while (queries.itemSize >= loadedItems.products.length) {
      itemResult.products.push(...loadedItems.products);
      if (loadedItems.products.length !== queries.itemSize) {
        break;
      }
      queries.pageNumber++;
      loadedItems = await this.loadArticles(queries, page);
    }
    await browser.close();
    return itemResult;
  };
  getBunjangProductList = async ({ keyword }: { keyword: string }) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const itemResult: { products: BunjangProduct[]; count: number } = { products: [], count: 0 };
    const queries: BunjangProps = {
      order: 'date',
      n: 10,
      page: 0,
      req_ref: 'search',
      q: keyword,
      stat_device: 'w',
      version: 4,
    };
    let loadedItems = await this.loadBunjangArticles(queries, page);
    itemResult.count = loadedItems.num_found;
    while (queries.n >= loadedItems.list.length) {
      itemResult.products.push(...loadedItems.list);
      if (loadedItems.list.length !== queries.n) {
        break;
      }
      queries.page++;
      loadedItems = await this.loadBunjangArticles(queries, page);
    }
    await browser.close();
    return this.filterBunjangOnSale(itemResult.products);
  };

  loadBunjangArticles = async (queries: BunjangProps, page: Page) => {
    const pageObject = await page.goto(
      `https://api.bunjang.co.kr/api/1/find_v2.json?${this.objectToQueryParams(queries)}`,
    );
    const { list, num_found }: { list: []; num_found: number } = await pageObject.json();
    return { list, num_found };
  };

  filterBunjangOnSale = (productList: BunjangProduct[]) => {
    const onSaleProductList = productList.filter((product) => product.status === '0');
    return { products: onSaleProductList, count: onSaleProductList.length };
  };

  loadArticles = async (queries: { itemSize: number; pageNumber: number; keyword: string }, page: Page) => {
    const pageObject = await page.goto(
      `https://apis.naver.com/cafe-web/cafe-search-api/v4.0/trade-search/all?query=${queries.keyword}&page=${queries.pageNumber}&size=${queries.itemSize}&recommendKeyword=true&searchOrderParamType=DEFAULT&transactionStatuses=ON_SALE`,
    );
    const { tradeArticleList, totalCount }: { tradeArticleList: unknown[]; totalCount: number } = (
      await pageObject.json()
    ).result;

    return { products: tradeArticleList, count: totalCount };
  };

  objectToQueryParams = (obj) => {
    const keys = Object.keys(obj);
    let queryString = '';
    keys.forEach((key, i) => {
      if (i === 0) {
        queryString += `${key}=${obj[key]}`;
      } else {
        queryString += `&${key}=${obj[key]}`;
      }
    });
    return queryString;
  };
}
