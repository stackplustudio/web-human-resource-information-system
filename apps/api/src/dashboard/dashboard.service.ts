import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  // Injeksi PrismaService untuk akses database
  constructor(private prisma: PrismaService) {}

  async getSummary(tenantId: string) {
    // 1. Dapatkan Total Headcount (Hanya karyawan yang ACTIVE)
    const totalEmployees = await this.prisma.employee.count({
      where: {
        tenantId,
        employmentStatus: 'ACTIVE',
      },
    });

    // 2. Dapatkan Absensi Hari Ini
    // Set waktu ke 00:00:00 hari ini sampai 00:00:00 besok untuk filter query
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAttendances = await this.prisma.attendance.findMany({
      where: {
        tenantId,
        date: {
          gte: today, // Greater than or equal to hari ini
          lt: tomorrow, // Less than besok
        },
      },
      select: { status: true }, // Hanya ambil status untuk menghemat memori
    });

    // Hitung rekap absensi
    const attendanceSummary = {
      present: todayAttendances.filter(a => a.status === 'PRESENT').length,
      late: todayAttendances.filter(a => a.status === 'LATE').length,
      absent: todayAttendances.filter(a => a.status === 'ABSENT').length,
    };

    // 3. Dapatkan Jumlah Cuti Pending
    const pendingLeaves = await this.prisma.leaveRequest.count({
      where: {
        tenantId,
        status: 'PENDING',
      },
    });

    // Kembalikan semua data dalam satu JSON yang rapi
    return {
      totalEmployees,
      attendanceSummary,
      pendingLeaves,
    };
  }
}