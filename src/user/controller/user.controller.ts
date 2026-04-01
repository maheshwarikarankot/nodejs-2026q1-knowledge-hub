import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../../commons/interfaces';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}


    @Post()
    @HttpCode(201)
    create(@Body() userDto: CreateUserDto){
        return this.userService.create(userDto);
    }

    @Get()
    findAll(): User[] {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string){
        return this.userService.findOne(id);
    }

    @Put(':id')
    updatePassword(@Param('id', ParseUUIDPipe) id: string, @Body() updatePasswordDto: UpdatePasswordDto){
        return this.userService.updatePassword(id, updatePasswordDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string){
        return this.userService.delete(id);
    }
}
