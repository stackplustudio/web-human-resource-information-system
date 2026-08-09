import 'dotenv/config';

export default {
  schema: './src/prisma/schema.prisma',
  migrate: {
    url: process.env.DATABASE_URL,
  },
};