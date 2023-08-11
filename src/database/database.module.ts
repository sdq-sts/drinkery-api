import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION } from '@/constants';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
          ssl: IS_PRODUCTION,
        });
        const db = drizzle(pool, { schema });

        await migrate(db, { migrationsFolder: './src/database/migrations' });

        return db;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
