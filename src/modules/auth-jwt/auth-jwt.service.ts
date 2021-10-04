import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import {compareSync} from 'bcrypt';

@Injectable()
export class AuthJwtService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if(user && compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        } else {
            return null;
        }
    }

    async login(user: any) {
        const payload = user;
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
