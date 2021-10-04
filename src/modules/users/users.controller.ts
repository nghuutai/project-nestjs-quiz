
import {Body, Controller, Param, ParseUUIDPipe, Post, Put, UseGuards} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserDTO } from 'src/dto/user.dto';
import { Role } from 'src/entity/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from '../auth-jwt/jwt-auth.guard';
import { UsersService } from './users.service';
ParseUUIDPipe

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @Roles(Role.Admin)
    async create(@Body() user: UserDTO): Promise<UserDTO> {
      return this.userService.createNote(user);
    }

    @Put('/:id')
    async update(@Body() user: UserDTO, @Param('id', ParseUUIDPipe) id: string): Promise<UserDTO> {
      return this.userService.updateNote(user, id);
    }
}