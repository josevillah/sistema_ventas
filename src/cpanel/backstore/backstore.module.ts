import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { BackstoreController } from "./backstore.controller";
import { BackstoreService } from "./backstore.service";

@Module({
    imports: [PrismaModule],
    controllers: [BackstoreController],
    providers: [BackstoreService]
})
export class BackstoreModule {}