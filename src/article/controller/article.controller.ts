import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { CreateArticleDto } from '../dto/update-article.dto';
import { Article } from '../../commons/interfaces';
import { ArticleStatus } from '../../commons/enums';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @HttpCode(201)
    create(@Body() articleDto: CreateArticleDto) {
        return this.articleService.create(articleDto);
    }   

    @Get()
    @HttpCode(200)
    findAll(
        @Query('status') status? : ArticleStatus,
        @Query('categoryId') categoryId? : string,
        @Query('tag') tag? : string,
        @Query('page') page? : number,
        @Query('limit') limit? : number,
        @Query('sortBy') sortBy? : string,
        @Query('order') order? : 'asc' | 'desc',
    ){
        return this.articleService.findAll({
            status,
            categoryId,
            tag,
            page : page ? Number(page) : undefined,
            limit : limit ? Number(limit) : undefined,
            sortBy,
            order,
    });
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseUUIDPipe) id: string): Article {
        return this.articleService.findOne(id);
    }

    @Put(':id')
    @HttpCode(200)
    update(@Param('id', ParseUUIDPipe) id: string, @Body() articleDto: CreateArticleDto): Article {
        return this.articleService.update(id, articleDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.articleService.remove(id);
    }       
}
