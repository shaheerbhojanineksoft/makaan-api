import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DB_CONNECTION } from './common/account-type';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      connectionName: DB_CONNECTION.user,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get<string>('MONGODB_HOST') || 'mongodb://127.0.0.1:27017'}/makaan_user`,
      }),
    }),
    MongooseModule.forRootAsync({
      connectionName: DB_CONNECTION.agency,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get<string>('MONGODB_HOST') || 'mongodb://127.0.0.1:27017'}/makaan_agency`,
      }),
    }),
    MongooseModule.forRootAsync({
      connectionName: DB_CONNECTION.lawyer,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get<string>('MONGODB_HOST') || 'mongodb://127.0.0.1:27017'}/makaan_lawyer`,
      }),
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
