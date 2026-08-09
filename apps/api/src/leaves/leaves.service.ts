import { Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeavesService {
  constructor(private prisma: PrismaService) {}

  async create(createLeaveDto: CreateLeaveDto) {
    return this.prisma.leaveRequest.create({
      data: {
        ...createLeaveDto,
        startDate: new Date(createLeaveDto.startDate),
        endDate: new Date(createLeaveDto.endDate),
      },
    });
  }

  // Mengambil daftar cuti untuk HR/Admin (bisa difilter berdasarkan status PENDING)
  async findAllByTenant(tenantId: string, status?: string) {
    const whereClause: any = { tenantId };
    if (status) {
      whereClause.status = status;
    }

    return this.prisma.leaveRequest.findMany({
      where: whereClause,
      include: {
        employee: {
          select: { fullName: true, department: { select: { name: true } } }
        }
      },
      orderBy: { startDate: 'desc' },
    });
  }

  // Mengambil riwayat pengajuan cuti untuk satu karyawan
  async findAllByEmployee(employeeId: string) {
    return this.prisma.leaveRequest.findMany({
      where: { employeeId },
      orderBy: { startDate: 'desc' },
    });
  }

  async update(id: string, updateLeaveDto: UpdateLeaveDto) {
    const dataToUpdate: any = { ...updateLeaveDto };
    
    if (updateLeaveDto.startDate) dataToUpdate.startDate = new Date(updateLeaveDto.startDate);
    if (updateLeaveDto.endDate) dataToUpdate.endDate = new Date(updateLeaveDto.endDate);

    return this.prisma.leaveRequest.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  // Fungsi khusus untuk HR menyetujui/menolak cuti
  async updateStatus(id: string, status: 'APPROVED' | 'REJECTED', approvedBy: string) {
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { 
        status,
        approvedBy // Menyimpan ID Admin yang melakukan approval
      },
    });
  }

  async remove(id: string) {
    return this.prisma.leaveRequest.delete({
      where: { id },
    });
  }
}