import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.interface';

@Injectable()
export class FileLoggerService implements LoggerService {
  log(message: string) {
    console.log('[File]', message);
  }
}
