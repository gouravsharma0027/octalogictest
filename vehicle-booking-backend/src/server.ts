import dotenv from 'dotenv';
import app from './app.js';
import { PrismaClient } from '@prisma/client';
import { seed } from '../prisma/seed.js';

dotenv.config();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const SEED_DB = process.env.SEED_DB;

async function main() {
  try {
    if (SEED_DB === 'YES') {
      console.log('Seeding database...');
      await seed();
      console.log('Seeding complete');
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error during startup:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
