import { Module } from '@nestjs/common';
import { ConsoleLoggerService } from './console-logger.service';
import { FileLoggerService } from './file-logger.service';
import { LoggerService } from './logger.interface';

// contoh custom provider useClass
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
    // Tetap daftarkan keduanya agar bisa di-inject jika dibutuhkan langsung
    ConsoleLoggerService,
    FileLoggerService,

    // ✅ useExisting: alias yang menunjuk ke instance LoggerService yang sama
    // Tidak membuat instance baru — hanya referensi ke provider yang sudah ada
    {
      provide: 'USER_LOGGER',
      useExisting: LoggerService,
    },
  ],
  exports: [LoggerService, 'USER_LOGGER'],
})
export class LoggerModule {}
