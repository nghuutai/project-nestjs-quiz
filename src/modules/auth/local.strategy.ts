import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(); // config
    }

    async validate(userName: string, password: string): Promise<any> {
        const user1 = await this.authService.validateUser(userName, password);

        if (!user1) {
            throw new UnauthorizedException();
        }
        return user1;
    }
}