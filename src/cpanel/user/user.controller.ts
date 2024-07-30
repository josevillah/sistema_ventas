import { Controller, Post, Get, Body, Req, Res, HttpException, HttpStatus, Redirect } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('/login')
    async login(@Body() data: { username: string, password: string}, @Req() req: Request ){
        try{
            const user = await this.userService.login(data); // Añadido await aquí
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

    @Get('/logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        req.session.destroy((err) => {
            if (err) {
                throw new HttpException('Error al cerrar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
        return res.redirect('/cpanel');
    }

    @Get('/me')
    async me(@Req() req: Request) {
        if (!req.session.user) {
            throw new HttpException('No hay sesión activa', HttpStatus.UNAUTHORIZED);
        }
        return req.session.user;
    }
}
