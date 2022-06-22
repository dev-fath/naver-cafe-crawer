import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerController } from './controller/crawler/crawler.controller';
import { CrawlingService } from './services/crawling/crawling.service';
import { ProductService } from './services/crawling/product.service';
import { ProductController } from './controller/crawler/product.controller';

@Module({
  imports: [],
  controllers: [AppController, CrawlerController, ProductController],
  providers: [AppService, CrawlingService, ProductService],
})
export class AppModule {}
