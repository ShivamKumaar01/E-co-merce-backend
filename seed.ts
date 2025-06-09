import { AppDataSource } from './src/database/data-source';
// import { SeederOptions, SeederFactoryManager, runSeeders } from '@typeorm-extension/seeder';
import { Seeder, runSeeders,SeederOptions } from 'typeorm-extension';
import { DataSource } from 'typeorm';

const options: SeederOptions = {
  seeds: ['src/database/seeders/**/*.ts'],  
};

async function seed() {
  await AppDataSource.initialize();

  await runSeeders(AppDataSource, options);

  console.log(' Seeding completed');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error(' Seeding failed:', err);
  process.exit(1);
});