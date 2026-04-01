import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../commons/interfaces'; 
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'node:crypto';
import { UserRole } from '../../commons/enums';

@Injectable()
export class UserService {
    private readonly users: User[] = [];

    findAll(): User[] {
        return this.users;
    }

    findOne(id: string): User {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`); // Throw 404 if user not found
        }
        return user;
    }

    create(dto: CreateUserDto){
        const now = Date.now();
        const newuser: User = {
            id: randomUUID(),
            login: dto.login,
            password: dto.password,
            role: dto.role ?? UserRole.VIEWER,
            createdAt: now,
            updatedAt: now
        };
        this.users.push(newuser);
        return newuser;
    }

    updatePassword(id: string, dto: UpdatePasswordDto): User {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`); // Throw 404 if user not found
        }
        if(user.password !== dto.oldPassword){
            throw new ForbiddenException(`Old password does not match`); // Throw 400 if old password is incorrect
        }
        user.password = dto.newPassword;
        user.updatedAt = Date.now();
        return user;
    }

    delete(id: string): void {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found`); // Throw 404 if user not found
        }
        this.users.splice(index, 1);
    }   

}
