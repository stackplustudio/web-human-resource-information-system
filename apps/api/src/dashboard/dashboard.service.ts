import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(tenantId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Ambil data dari database
    const totalEmployees = await this.prisma.employee.count({ where: { tenantId } });
    const todayAttendances = await this.prisma.attendance.findMany({
      where: {
        tenantId,
        date: {
          gte: today,
        },
      },
    });

    // Menghitung statistik dengan tipe '(a: any)' untuk mencegah error implicit-any
    return {
      totalEmployees,
      present: todayAttendances.filter((a: any) => a.status === 'PRESENT').length,
      late: todayAttendances.filter((a: any) => a.status === 'LATE').length,
      absent: todayAttendances.filter((a: any) => a.status === 'ABSENT').length,
    };
  }
}