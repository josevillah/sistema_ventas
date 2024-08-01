import { Module } from "@nestjs/common";
import { CpanelController } from "./cpanel.controller";
import { CpanelService } from "./cpanel.service";
import { UserService } from "./user/user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [CpanelController],
    providers: [CpanelService, UserService]
})

export class CpanelModule {}