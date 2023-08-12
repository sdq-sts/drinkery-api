import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '@/database/database.module';
import { DrinksModule } from '@/modules/drinks/drinks.module';

@Module({
  imports: [
    DrizzleModule,
    DrinksModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
