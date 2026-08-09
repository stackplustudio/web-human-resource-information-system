import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        ...createEmployeeDto,
        joinDate: new Date(createEmployeeDto.joinDate), // Konversi string ke Date Object
      },
    });
  }

  // Mengambil semua karyawan berdasarkan tenant tertentu
  async findAllByTenant(tenantId: string) {
    return this.prisma.employee.findMany({
      where: { tenantId },
      include: {
        department: true,
        user: { select: { email: true, role: true } }, // Join ringan untuk ambil email
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: { department: true, manager: true },
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // Jika ada update joinDate, pastikan dikonversi
    const dataToUpdate: any = { ...updateEmployeeDto };
    if (updateEmployeeDto.joinDate) {
      dataToUpdate.joinDate = new Date(updateEmployeeDto.joinDate);
    }

    return this.prisma.employee.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}