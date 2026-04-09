import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { ArticleModule } from '../article/article.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [ArticleModule, CommentModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export UserService for use in AppModule
})
export class UserModule {}
