import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ArticleService } from '../../article/service/article.service';
import { CommentService } from '../../comment/service/comment.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: ArticleService,
          useValue: { nullifyAuthor: jest.fn() },
        },
        {
          provide: CommentService,
          useValue: { removeByAuthor: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
