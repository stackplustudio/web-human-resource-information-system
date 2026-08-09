import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai proses seeding database...');

  // 1. Hash password agar aman dan dikenali oleh sistem Auth NestJS kamu
  const passwordHash = await bcrypt.hash('stackplustudio6', 10);

  // 2. Suntikkan akun Super Admin ke tabel User
  const superAdmin = await prisma.user.upsert({
    where: { email: 'stackplustudio@gmail.com' },
    update: {
      password: passwordHash, // 👈 TAMBAHKAN INI: Paksa update password!
    },
    create: {
      email: 'stackplustudio@gmail.com',
      password: passwordHash,
      role: 'SUPER_ADMIN',
      status: true,
    },
  });

  console.log('✅ Berhasil membuat akun Super Admin!');
  console.log('📧 Email    :', superAdmin.email);
  console.log('🔑 Password : stackplustudio6');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });