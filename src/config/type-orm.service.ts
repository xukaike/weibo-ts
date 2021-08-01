import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface ormConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  synchronize: boolean;
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(this.configService.get<string>('orm.host'));
    console.log(this.configService.get<string>('orm.password'));
    console.log(this.configService.get<string>('orm.username'));
    return {
      type: 'mysql',
      host: this.configService.get<string>('orm.host'),
      port: this.configService.get<number>('orm.port'),
      username: this.configService.get<string>('orm.username'),
      password: this.configService.get<string>('orm.password'),
      database: this.configService.get<string>('orm.database'),
      entities: this.configService.get<string[]>('orm.entities'),
      synchronize: this.configService.get<boolean>('orm.synchronize'),
    };
  }
}
