import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const client = new Client({
            user: configService.get<string>('DATABASE_USER'),
            host: configService.get<string>('DATABASE_HOST'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            port: configService.get<number>('DATABASE_PORT'),
          });

          await client.connect();

          // Create the database if it doesn't exist
          const dbName = configService.get<string>('DATABASE_NAME');
          const checkDbExists = await client.query(
            `SELECT 1 FROM pg_database WHERE datname='${dbName}'`,
          );

          if (checkDbExists.rowCount === 0) {
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database "${dbName}" created successfully!`);
          } else {
            console.log(`Database "${dbName}" already exists.`);
          }

          await client.end();

          const dataSource = new DataSource({
            type: 'postgres',
            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get<string>('DATABASE_USER'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_NAME'),
            synchronize: true,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`], // Automatically load all entity files in the src folder
          });

          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.error('Error connecting to the database', error);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
