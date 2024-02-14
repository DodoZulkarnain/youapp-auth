import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { RefreshToken } from './dto/refreshToken.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AllExceptionsFilter } from 'src/rpc-exception/all-exception.filter';

@Controller()
export class AuthController {
    constructor(private authService: AuthService,){}

    @MessagePattern({ cmd: 'refreshToken' })
    @UseFilters(new AllExceptionsFilter())
    async updateToken(@Body() refreshToken:RefreshToken){
        return await this.authService.refresToken(refreshToken);
    }

    @MessagePattern({ cmd: 'login' })
    @UseFilters(new AllExceptionsFilter())
    @UsePipes(new ValidationPipe)
    async Login(@Body() LoginDto: LoginDto){
        return await this.authService.login(LoginDto);
    }
}
