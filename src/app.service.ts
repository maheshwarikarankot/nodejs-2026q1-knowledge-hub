import { Injectable} from '@nestjs/common';
import { UserService } from './user/service/user.service';
import { ArticleService } from './article/service/article.service';
import { CommentService } from './comment/service/comment.service';
import { CategoryService } from './category/service/category.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}