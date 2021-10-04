import { Controller, Post, Get, Request, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { AuthJwtService } from './auth-jwt.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthJwtController {
    constructor(private authService: AuthJwtService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protect-jwt')
    hello(@Request() req) {
        return req.user;
    }
}
