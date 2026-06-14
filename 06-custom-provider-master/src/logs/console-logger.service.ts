import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.interface';

@Injectable()
export class ConsoleLoggerService implements LoggerService {
  log(message: string) {
    console.log('[Console]', message);
  }
}
