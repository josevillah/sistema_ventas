import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { CpanelService } from "./cpanel.service";

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
  dashboard(){
    return {};
  }

}