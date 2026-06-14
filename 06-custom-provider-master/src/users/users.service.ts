import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoggerService } from 'src/logs/logger.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logger: LoggerService,
    @Inject('USER_LOGGER')
    private readonly logger2: LoggerService,
  ) {}

  getDatabaseConfig(): any {
    this.logger2.log(`Database config user`);
    return this.databaseService.getConfig();
  }

  getDatabaseConnection(): any {
    this.logger.log(`Database connected`);
    return this.databaseService.getConnection();
  }
}
