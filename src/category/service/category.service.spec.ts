import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { ArticleService } from '../../article/service/article.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: ArticleService,
          useValue: { nullifyCategory: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
