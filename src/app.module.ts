import { Module } from '@nestjs/common';
import { StoreModule } from './Store/store.module';
import { CpanelModule } from './cpanel/cpanel.module';

@Module({
  imports: [StoreModule, CpanelModule],
})
export class AppModule {}
