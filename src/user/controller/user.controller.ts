import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    @HttpCode(201)
    create(@Body() userDto: CreateUserDto){
        return this.userService.create(userDto);
    }
}
