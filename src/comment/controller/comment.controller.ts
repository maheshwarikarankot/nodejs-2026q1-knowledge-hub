import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @HttpCode(201)
    create(@Body() commentDto: CreateCommentDto) {
        return this.commentService.create(commentDto);
    }

    @Get()
    @HttpCode(200)
    findAll(
        @Query('articleId') articleId? : string,
        @Query('page') page? : number,
        @Query('limit') limit? : number,
        @Query('sortBy') sortBy? : string,
        @Query('order') order? : 'asc' | 'desc',        
    ) {
        if (!articleId) {
            throw new BadRequestException('articleId query parameter is required');
        }
        return this.commentService.findAll(
           articleId,{
           page: page ? Number(page) : undefined,
           limit: limit ? Number(limit) : undefined,
           sortBy,
           order,
        });
    }   

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.commentService.remove(id);
    }
}
