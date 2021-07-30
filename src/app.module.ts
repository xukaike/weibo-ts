import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from './config/configuration';
import { TypeOrmConfigService } from './config/type-orm.service';

@Module({
  controllers: [AppController],
  providers: [AppService, ConfigService],
  imports: [
    ConfigModule.forRoot({
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/user/changeInfo',
        method: RequestMethod.POST,
      },
      {
        path: '/user/changePassword',
        method: RequestMethod.POST,
      },
    );
  }
}
