import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: this.configService.get<string>('SEQUELIZE_HOST'),
      port: this.configService.get<number>('SEQUELIZE_PORT'),
      username: this.configService.get<string>('SEQUELIZE_USERNAME'),
      password: this.configService.get<string>('SEQUELIZE_PASSWORD'),
      database: this.configService.get<string>('SEQUELIZE_DATABASE'),
      synchronize: true,
      autoLoadModels: true,
    };
  }
}
