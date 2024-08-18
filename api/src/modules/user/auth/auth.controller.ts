import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDTO } from '../user.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Public()
@Controller('api/auth')
export class AuthController {
    constructor(private authSvc: AuthService) { }

    @Post('register')
    register(@Body() user: RegisterDTO) {
        return this.authSvc.register(user);
    } 

    @UseGuards(AuthGuard('local'))
    @Post('authenticate')
    authenticate(@Request() req) {
        return this.authSvc.authenticate(req.user);
    }
}
