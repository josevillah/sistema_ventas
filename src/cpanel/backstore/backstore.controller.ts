import { Controller, Get, Req, Res, Render, Post, Body, HttpException, HttpStatus, Put, Delete } from "@nestjs/common";
import { Request, Response } from 'express';
import { BackstoreService } from "./backstore.service";
import { json } from "stream/consumers";

@Controller('backstore')
export class BackstoreController {

    constructor(private backstoreService: BackstoreService) {}

    @Get('/')
    @Render('cpanel/bodys/backstore')
    async backstore(@Req() req: Request, @Res() res: Response) {
        if (!req.session.user) {
            return res.redirect('/cpanel');
        }

        if(req.session.user.typeUser !== 1 || req.session.user.typeUser !== 2) {
            return res.redirect('/cpanel');
        }

        const backs = await this.backstoreService.getAll();
        return {
            user: req.session.user,
            backs
        };
    }

    @Post('/new')
    async new(@Body() data: { backstore: string, direction: string, phone: string }, @Req() req: Request, @Res() res: Response
    ) {
        if (!req.session.user) {
            return res.redirect('/cpanel');
        }

        if(req.session.user.typeUser !== 1 || req.session.user.typeUser !== 2) {
            return res.redirect('/cpanel');
        }

        try {
            const result = await this.backstoreService.new(data);
            return res.json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ message: error.message });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error inesperado' });
        }
    }

    @Post('/getDataForUpdate')
    async getDataForUpdate(@Body() data: {id: string}, @Req() req: Request, @Res() res: Response) {
        if (!req.session.user) {
            return res.redirect('/cpanel');
        }

        try {
            const result = await this.backstoreService.getDataForUpdate(data);
            return res.json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ message: error.message });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error inesperado' });
        }
    }

    @Put('/updateBackstoreForId')
    async updateBackstoreForId(@Body() data: { idBackstore: string, backstore: string, direction: string, phone: string }, @Req() req: Request, @Res() res: Response) {
        if (!req.session.user) {
            return res.redirect('/cpanel');
        }

        try {
            const result = await this.backstoreService.updateBackstoreForId(data);
            return res.json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ message: error.message });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error inesperado' });
        }
    }

    @Delete('/deleteBackstoreForId')
    async deleteBackstoreForId(@Body() data: { id: string }, @Req() req: Request, @Res() res: Response) {
        if (!req.session.user) {
            return res.redirect('/cpanel');
        }

        try {
            const result = await this.backstoreService.deleteBackstoreForId(data);
            return res.json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                return res.status(error.getStatus()).json({ message: error.message });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error inesperado' });
        }
    }
}