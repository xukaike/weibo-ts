import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    // return this.configService.get<TypeOrmModuleOptions>('orm');
    return {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'weibo',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
