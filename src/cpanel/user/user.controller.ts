import { Controller, Post, Get, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('/login')
    login(@Body() data: { username: string, password: string}, @Req() req: Request ){
        try{
            const user = this.userService.login(data);
            req.session.user = user; // Almacena el usuario en la sesión
            return user;
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/createUser')
    async createUser(@Body() data: { username: string; password: string; full_name: string }) {
        try {
            return await this.userService.createUser(data);
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/logout')
    async logout(@Req() req: Request) {
        req.session.destroy((err) => {
        if (err) {
            throw new HttpException('Error al cerrar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        });
        return { message: 'Sesión cerrada' };
    }

    @Get('/me')
    async me(@Req() req: Request) {
        if (!req.session.user) {
            throw new HttpException('No hay sesión activa', HttpStatus.UNAUTHORIZED);
        }
        return req.session.user;
    }
}