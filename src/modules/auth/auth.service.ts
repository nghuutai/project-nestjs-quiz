import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.userService.findOne(userName);

        if(user && user.password === password) {
            const { username, password, ...rest } = user;
            return rest;
        }
    }
}
