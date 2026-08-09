import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendancesService {
  constructor(private prisma: PrismaService) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    return this.prisma.attendance.create({
      data: {
        ...createAttendanceDto,
        // Konversi string dari frontend menjadi Object Date yang dimengerti Prisma/Postgres
        date: new Date(createAttendanceDto.date),
        checkIn: createAttendanceDto.checkIn ? new Date(createAttendanceDto.checkIn) : null,
        checkOut: createAttendanceDto.checkOut ? new Date(createAttendanceDto.checkOut) : null,
      },
    });
  }

  // Mengambil histori absensi per tenant (untuk dashboard Admin)
  async findAllByTenant(tenantId: string) {
    return this.prisma.attendance.findMany({
      where: { tenantId },
      include: {
        employee: {
          select: { fullName: true, position: true }
        }
      },
      orderBy: { date: 'desc' }, // Urutkan dari yang paling baru
    });
  }

  // Mengambil histori absensi per karyawan (untuk Self-Service Portal)
  async findAllByEmployee(employeeId: string) {
    return this.prisma.attendance.findMany({
      where: { employeeId },
      orderBy: { date: 'desc' },
    });
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    const dataToUpdate: any = { ...updateAttendanceDto };
    
    // Parsing ulang tanggal jika ada update (misal koreksi manual oleh HR)
    if (updateAttendanceDto.date) dataToUpdate.date = new Date(updateAttendanceDto.date);
    if (updateAttendanceDto.checkIn) dataToUpdate.checkIn = new Date(updateAttendanceDto.checkIn);
    if (updateAttendanceDto.checkOut) dataToUpdate.checkOut = new Date(updateAttendanceDto.checkOut);

    return this.prisma.attendance.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    return this.prisma.attendance.delete({
      where: { id },
    });
  }
}