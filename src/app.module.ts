import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerController } from './controller/crawler/crawler.controller';
import { CrawlingService } from './services/crawling/crawling.service';

@Module({
  imports: [],
  controllers: [AppController, CrawlerController],
  providers: [AppService, CrawlingService],
})
export class AppModule {}
