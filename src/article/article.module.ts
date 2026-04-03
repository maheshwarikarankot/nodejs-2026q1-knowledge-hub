import { Module } from '@nestjs/common';
import { ArticleController } from './controller/article.controller';
import { ArticleService } from './service/article.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
