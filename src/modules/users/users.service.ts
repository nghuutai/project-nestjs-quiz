import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import {hashSync, genSaltSync} from 'bcrypt';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
      ) {}

    async findOne(userName: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username: userName } });
    }

    async createNote(user: UserDTO): Promise<UserDTO> {
        const saltRounds = 10;
        const myPlaintextPassword = user.password;
        const salt = genSaltSync(saltRounds);
        const hash = hashSync(myPlaintextPassword, salt);
        const userData = new User();
        userData.username = user.username;
        userData.password = hash;
        userData.role = user.role;
        return await userData.save();
    }

    async updateNote(user: UserDTO, id: string): Promise<UserDTO> {
        const userData = new User();
        userData.id = id;
        userData.username = user.username;
        userData.password = user.password;
        userData.role = user.role;
        return userData.save();
    }
    
}
