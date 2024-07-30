import { Body, Controller, Get, Post, Render, Req, Res } from "@nestjs/common";
import { CpanelService } from "./cpanel.service";
import { Request, Response } from 'express';

@Controller('cpanel')
export class CpanelController {
  cpanelService: CpanelService;

  constructor(cpanelService:CpanelService) {
    this.cpanelService = cpanelService;
  }

  @Get('/')
  @Render('cpanel/bodys/login')
  showLogin(){
    return {};
  }

  @Get('/dashboard')
  @Render('cpanel/bodys/dashboard')
  dashboard(@Req() req: Request, @Res() res: Response){
    if(!req.session.user){
      return res.redirect('/cpanel');
    }
    
    return {
        user: req.session.user
    };
  }

}