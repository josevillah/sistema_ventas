import { Controller, Get, Post, Render, Req, Res } from "@nestjs/common";
import { CpanelService } from "./cpanel.service";
import { UserService } from "./user/user.service";
import { Request, Response } from 'express';

@Controller('cpanel')
export class CpanelController {
  cpanelService: CpanelService;
  userService: UserService;

  constructor(cpanelService:CpanelService, UserService: UserService) {
    this.cpanelService = cpanelService;
    this.userService = UserService;
  }

  @Get('/')
  @Render('cpanel/bodys/login')
  showLogin(@Req() req: Request, @Res() res: Response){

    if (req.session.user) {
      return res.redirect('/cpanel/dashboard');
    }
    return {};
  }

  @Get('/dashboard')
  @Render('cpanel/bodys/dashboard')
  dashboard(@Req() req: Request, @Res() res: Response) {
    
    if (!req.session.user) {
      return res.redirect('/cpanel');
    }

    return {
      user: req.session.user
    };
  }
  
  @Get('/profile')
  @Render('cpanel/bodys/profile')
  profile(@Req() req: Request, @Res() res: Response) {

    if (!req.session.user) {
      return res.redirect('/cpanel');
    }
    
    return {
      user: req.session.user
    };
  }

  @Get('/users')
  @Render('cpanel/bodys/users')
  users(@Req() req: Request, @Res() res: Response) {

    if (!req.session.user) {
      return res.redirect('/cpanel');
    }

    const result = this.userService.getAllUsers();
    console.log(result);
    return {
      user: req.session.user,
      users: result
    };
  }
}