import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { LoggingInterceptor } from './commons/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';

@Module({
  imports: [UserModule, ArticleModule, CategoryModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },],
})
export class AppModule {}