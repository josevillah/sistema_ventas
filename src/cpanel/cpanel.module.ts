import { Module } from "@nestjs/common";
import { CpanelController } from "./cpanel.controller";
import { CpanelService } from "./cpanel.service";

@Module({
    controllers: [CpanelController],
    providers: [CpanelService]
})

export class CpanelModule {}