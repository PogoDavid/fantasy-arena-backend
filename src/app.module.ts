import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from './datasource/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'], // Load .env.local first, then .env
    }),
    TypeOrmModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
