import { Body, Controller, Get, Post, Render } from "@nestjs/common";

@Controller('cpanel')
export class CpanelController {

  @Get('/')
  @Render('cpanel/bodys/login')
  showLogin(){
    return {};
  }

  @Post('/login')
  login(@Body() data: { user: string, password: string} ){
    return {
      user: data.user,
      password: data.password
    };
  }

  @Get('/dashboard')
  @Render('cpanel/bodys/dashboard')
  dashboard(){
    return {};
  }

}