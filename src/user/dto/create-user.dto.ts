import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../commons/enums';

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    login: string;

    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}   