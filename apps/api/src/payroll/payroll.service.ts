import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.payroll.findMany({
      where: { tenantId },
      include: { employee: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMyPayslips(employeeId: string) {
    return this.prisma.payroll.findMany({
      where: { employeeId, status: 'PAID' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async generateMonthly(tenantId: string, period: string) {
    // Cari semua karyawan aktif di perusahaan ini
    const employees = await this.prisma.employee.findMany({
      where: { tenantId, employmentStatus: 'ACTIVE' },
    });

    let generatedCount = 0;

    for (const emp of employees) {
      // Cek apakah bulan ini sudah di-generate
      const existing = await this.prisma.payroll.findUnique({
        where: { employeeId_period: { employeeId: emp.id, period } },
      });

      if (!existing) {
        // Gaji default (Bisa disesuaikan dari master data nanti)
        const basic = emp.position.includes('Developer') || emp.position.includes('Engineer') ? 12000000 : 8000000;
        const allow = 1000000;
        const deduct = 0;

        await this.prisma.payroll.create({
          data: {
            tenantId,
            employeeId: emp.id,
            period,
            basicSalary: basic,
            allowance: allow,
            deduction: deduct,
            netSalary: basic + allow - deduct,
            status: 'DRAFT',
          },
        });
        generatedCount++;
      }
    }
    return { message: `Berhasil generate ${generatedCount} slip gaji baru untuk periode ${period}` };
  }
}