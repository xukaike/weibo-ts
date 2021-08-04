import { WinstonModuleOptionsFactory } from 'nest-winston';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import 'winston-daily-rotate-file';
import { format, transports } from 'winston';
const { combine, timestamp, prettyPrint } = format;

export class WinstonConfigService implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      format: combine(timestamp(), prettyPrint()),
      transports: [
        new transports.DailyRotateFile({
          level: 'info',
          filename: './logs/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '100m',
          maxFiles: '7d',
        }),

        new transports.DailyRotateFile({
          level: 'error',
          filename: './logs/error/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '100m',
          maxFiles: '7d',
        }),

        new transports.DailyRotateFile({
          level: 'debug',
          filename: './logs/debug/debug-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '100m',
          maxFiles: '7d',
        }),

        new transports.DailyRotateFile({
          level: 'warn',
          filename: './logs/warn/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '100m',
          maxFiles: '7d',
        }),

        ,
      ],
    };
  }
}
