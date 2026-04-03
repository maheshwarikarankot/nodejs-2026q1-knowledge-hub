import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import { ArticleStatus } from '../../commons/enums';

export class CreateArticleDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsEnum(ArticleStatus)
    status?: ArticleStatus;

    @IsUUID()
    @IsOptional()
    authorId?: string; // refers to User

    @IsUUID()
    @IsOptional()
    categoryId?: string; // refers to Category

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags?: string[]; // array of tag names
}  