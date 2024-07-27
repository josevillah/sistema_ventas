import { Module } from '@nestjs/common';
import { StoreModule } from './Store/store.module';
import { AdminModule } from './Admin/admin.module';

@Module({
  imports: [StoreModule, AdminModule],
})
export class AppModule {}
