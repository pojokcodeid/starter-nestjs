import { Module } from '@nestjs/common';
import { connectionProvider, databaseProvider } from './database.provider';
import { DatabaseService } from './database.service';

@Module({
  providers: [databaseProvider, DatabaseService, connectionProvider],
  exports: [databaseProvider, DatabaseService, connectionProvider],
})
export class DatabaseModule {}
