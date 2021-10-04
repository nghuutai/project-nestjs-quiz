import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return { msg: "Loggin in" };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('protect')
    getHello(@Request() req): string {
        return req.user;
    }
}
