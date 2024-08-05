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
  async profile(@Req() req: Request, @Res() res: Response) {

    if (!req.session.user) {
      return res.redirect('/cpanel');
    }

    const type = await this.userService.getTypeForId({id: req.session.user.type_id});
    
    return {
      user: req.session.user,
      type
    };
  }

  @Get('/users')
  @Render('cpanel/bodys/users')
  async users(@Req() req: Request, @Res() res: Response) {

    if (!req.session.user) {
      return res.redirect('/cpanel');
    }

    if(req.session.user.type_id != 1 && req.session.user.type_id != 2) {
      return res.redirect('/cpanel/dashboard');
    }

    const result = await this.userService.getAllUsers();
    const typeUsers = await this.userService.getAllTypeUsers();
    
    return {
      user: req.session.user,
      users: result,
      typeUsers: typeUsers
    };
  }
}