// db seeder
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ReadStream, createReadStream } from 'node:fs';
import { parse } from 'fast-csv';
import { Drink, drinks } from '../src/database/schema';
import { resolve } from 'node:path';
import { imageSizes } from './constants';

type DrinkFromCSV = Omit<Drink, 'createdAt'> & {
  ingredients: string;
  instructions: string;
  images: string[];
};

const csvFile = createReadStream(
  resolve(__dirname, '..', 'src/database/seed/drinks.csv'),
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function readCSVFile(stream: ReadStream): Promise<Drink[]> {
  return new Promise((resolve) => {
    const results: Drink[] = [];

    stream
      .pipe(parse({ headers: true }))
      .on('data', (row: Drink & DrinkFromCSV) => {
        const ingredients = row.ingredients
          .split(',')
          .map((i: string) => i.trim());
        const instructions = row.instructions
          .split('.')
          .map((i: string) => i.trim());
        const images = imageSizes.map(
          (size: number) => `/images/${row.id}-${size}.jpg`,
        );

        results.push({
          ...row,
          ingredients,
          instructions,
          images,
        });
      })
      .on('end', () => {
        resolve(results);
      });
  });
}

(async () => {
  const db = drizzle(pool);

  const allDrinks: Drink[] = await readCSVFile(csvFile);
  console.log('Rows from CSV:', allDrinks.length);

  const result = await db
    .insert(drinks)
    .values(allDrinks)
    .returning()
    .onConflictDoNothing()
    .execute();
  console.log('Inserted in the database:', result.length);
  csvFile.destroy();
})();
