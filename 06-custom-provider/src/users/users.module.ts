import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from 'src/logs/logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
