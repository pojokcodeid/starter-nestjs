import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoggerService } from 'src/logs/logger.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly loggerService: LoggerService,
    @Inject('USER_LOGGER') private readonly userLogger: LoggerService,
  ) {}

  getDatabaseConfig(): any {
    this.loggerService.log('Getting database config from user');
    return this.databaseService.getConfig();
  }

  getDatabaseConnection(): any {
    this.userLogger.log('Getting database connection userlog');
    return this.databaseService.getConnection();
  }
}
