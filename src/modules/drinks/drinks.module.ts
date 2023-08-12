import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { DrizzleModule } from '@/database/database.module';

@Module({
  imports: [DrizzleModule],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
