import { Controller, Get } from "@nestjs/common";

@Controller()
export class StoreController {
    @Get('/')
    getStore() {
        return 'Pagina principal de la tienda';
    }
}