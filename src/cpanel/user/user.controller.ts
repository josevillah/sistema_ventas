import { Controller, Post, Get, Body, Req, Res, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('/login')
    async login(@Body() data: { username: string, password: string}, @Req() req: Request ){
        try{
            const user = await this.userService.login(data);
            // const typeUser = await this.userService.getTypeForId({id: user.type_id});
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
    async createUser(@Body() data: { username: string, type_id: number, password: string, full_name: string }) {
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

    @Put('/changePassword')
    async changePassword(@Body() data: {user: string, pass: string, newPasword: string}) {
        try {
            const result = await this.userService.changePassword(data);
            return result;
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/updateUser')
    async updateUser(@Body() data: {firstUsername: string, username: string, password: string, full_name: string}, @Req() req: Request) {
        try {
            const result = await this.userService.updateUser(data);
            req.session.user = result;
            return result;
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Delete('/deleteUser')
    async deleteUser(@Body() data: {id: string}, @Req() req: Request) {
        try {
            const result = await this.userService.deleteUser(data);
            return result;
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Post('/searchUsers')
    async searchUsers(@Body() data: {search: string}, @Req() req: Request) {
        try {
            const result = await this.userService.searchUsers(data);
            const typeUsers = await this.userService.getAllTypeUsers();
            return {
                users: result,
                typeUsers
            };
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @Post('/getUserForId')
    async getUserForId(@Body() data: {id: string}, @Req() req: Request) {
        try {
            const result = await this.userService.getUserForId(data);
            const typeUsers = await this.userService.getAllTypeUsers();

            return {
                user: result,
                typeUsers
            };
            
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/editUserForId')
    async editUserForId(@Body() data: {idUser: string, type_id: number, btnSwitch: boolean}, @Req() req: Request) {
        try {
            if(data.btnSwitch){
                data.btnSwitch = true;
            }else{
                data.btnSwitch = false;
            }
            const result = await this.userService.editUserForId(data);
            return result;
        }catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error inesperado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
