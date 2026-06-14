import { LoggerService } from './logger.interface';
import { ConsoleLoggerService } from './console-logger.service';
import { FileLoggerService } from './file-logger.service';
import { Module } from '@nestjs/common';

const loggerProvider = {
  provide: LoggerService,
  useClass:
    process.env.NODE_ENV === 'production'
      ? FileLoggerService
      : ConsoleLoggerService,
};

@Module({
  providers: [
    loggerProvider,
    ConsoleLoggerService,
    FileLoggerService,
    {
      provide: 'USER_LOGGER',
      useExisting: LoggerService,
    },
  ],
  exports: [LoggerService, 'USER_LOGGER'],
})
export class LoggerModule {}
