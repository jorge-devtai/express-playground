import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const db = createClient({
  url: process.env.DATABASE_URL || 'file:./db.sqlite',
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export default db;