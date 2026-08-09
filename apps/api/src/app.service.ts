import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as ws from 'ws';

// Wajib untuk environment Node.js agar Neon bisa memakai WebSocket
neonConfig.webSocketConstructor = ws;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Ambil URL database dari environment
    const connectionString = process.env.DATABASE_URL;

    // 2. Buat connection pool khusus Neon
    const pool = new Pool({ connectionString });

    // 3. Bungkus dengan Prisma Adapter
    const adapter = new PrismaNeon(pool);

    // 4. Lempar adapter ke constructor PrismaClient (aturan wajib Prisma 7)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}