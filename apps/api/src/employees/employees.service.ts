import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      // Enkripsi password menggunakan bcrypt dengan saltRounds = 10
      const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);

      // Gunakan Transaction agar aman: Gagal satu = batal semua, tambah type 'any' pada tx
      return await this.prisma.$transaction(async (tx: any) => {
        
        // Langkah 1: Buat Akun Log-in (User) dengan password ter-hash
        const newUser = await tx.user.create({
          data: {
            email: createEmployeeDto.email,
            password: hashedPassword,
            role: 'EMPLOYEE', // Fix Role error: langsung gunakan string literal
          },
        });

        // Langkah 2: Buat Profil Karyawan (Employee) dengan memasukkan userId
        return await tx.employee.create({
          data: {
            fullName: createEmployeeDto.fullName,
            position: createEmployeeDto.position,
            employmentStatus: createEmployeeDto.employmentStatus || 'ACTIVE',
            tenantId: createEmployeeDto.tenantId,
            departmentId: createEmployeeDto.departmentId,
            managerId: createEmployeeDto.managerId,
            joinDate: createEmployeeDto.joinDate ? new Date(createEmployeeDto.joinDate) : new Date(),
            userId: newUser.id,
          },
        });
      });
    } catch (error: any) {
      throw new InternalServerErrorException('Gagal membuat karyawan: ' + error.message);
    }
  }

  async findAllByTenant(tenantId: string) {
    return this.prisma.employee.findMany({
      where: { tenantId },
      include: {
        department: true,
        user: { select: { email: true, role: true } }, 
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