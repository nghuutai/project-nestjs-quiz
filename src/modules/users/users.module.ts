import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {User} from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersController} from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
