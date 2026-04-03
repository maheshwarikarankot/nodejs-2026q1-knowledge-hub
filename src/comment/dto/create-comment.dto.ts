import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsUUID()
    authorId: string;

    @IsOptional()
    @IsUUID()
    articleId?: string;
}