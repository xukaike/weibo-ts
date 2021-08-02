import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelize-config.service';

@Module({
  controllers: [AppController],
  providers: [AppService, ConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
      inject: [ConfigService],
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
