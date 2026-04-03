import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../../commons/interfaces';


@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @HttpCode(201)
    create(@Body() categoryDto: CreateCategoryDto): Category {
        return this.categoryService.create(categoryDto);
    }

    @Get()
    @HttpCode(200)
    findAll(){
        return this.categoryService.findAll();
    }       

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id',ParseUUIDPipe) id: string): Category {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    @HttpCode(200)
    update(@Param('id', ParseUUIDPipe) id: string, @Body() categoryDto: CreateCategoryDto): Category {
        return this.categoryService.update(id, categoryDto);
    }   

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseUUIDPipe) id: string): void {
        this.categoryService.remove(id);
    }
}
