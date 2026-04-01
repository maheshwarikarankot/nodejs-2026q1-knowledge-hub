import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export UserService for use in AppModule
})
export class UserModule {}
