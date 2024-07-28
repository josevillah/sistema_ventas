import { Module } from "@nestjs/common";
import { CpanelController } from "./cpanel.controller";

@Module({
    controllers: [CpanelController],
})

export class CpanelModule {}