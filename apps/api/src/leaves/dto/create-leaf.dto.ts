import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';

// Samakan dengan enum LeaveStatus di schema.prisma
enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  leaveType: string; // Contoh: "Cuti Tahunan", "Sakit", "Melahirkan"

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsEnum(LeaveStatus)
  @IsOptional()
  status?: LeaveStatus; // Otomatis PENDING dari database jika tidak dikirim

  @IsString()
  @IsOptional()
  reason?: string;
}