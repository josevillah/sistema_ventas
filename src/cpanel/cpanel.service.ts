import { Injectable } from "@nestjs/common";

@Injectable()
export class CpanelService {

    login(data: { user: string, password: string}){
        return data;
    }
}