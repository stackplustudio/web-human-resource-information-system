import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai injeksi data Tenant dan Employee...');

  // 1. Cari akun Admin yang udah kita buat semalam
  const adminUser = await prisma.user.findUnique({
    where: { email: 'stackplustudio@gmail.com' },
  });

  if (!adminUser) {
    throw new Error('❌ Akun Admin tidak ditemukan! Pastikan emailnya benar.');
  }

  // 2. Buat data Perusahaan (Tenant)
  let tenant = await prisma.tenant.findFirst({
    where: { name: 'StackPlus Studio' },
  });

  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: { 
        name: 'StackPlus Studio',
        subdomain: 'stackplus' // 👈 FIX 1: Tambahan kolom wajib
      },
    });
  }

  // 3. Buat data Karyawan yang dikaitkan dengan Perusahaan dan Akun Login
  let employee = await prisma.employee.findFirst({
    where: { userId: adminUser.id },
  });

  if (!employee) {
    employee = await prisma.employee.create({
      data: {
        fullName: 'Budi Cahyono',
        position: 'Full Stack Web Developer',
        employmentStatus: 'ACTIVE',
        joinDate: new Date(), // 👈 FIX 2: Tambahan kolom wajib
        tenantId: tenant.id,
        userId: adminUser.id,
      },
    });
  }

  console.log('\n✅ BERHASIL! INI DATA UNTUK FRONTEND KAMU:');
  console.log('====================================================');
  console.log(`const currentTenantId = '${tenant.id}';`);
  console.log(`const currentEmployeeId = '${employee.id}';`);
  console.log('====================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });