import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum, IsEmail } from 'class-validator';

// Menggunakan enum yang sama dengan schema Prisma
export enum EmploymentStatus {
  ACTIVE = 'ACTIVE',
  PROBATION = 'PROBATION',
  ON_LEAVE = 'ON_LEAVE',
  RESIGNED = 'RESIGNED',
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  // 👈 TAMBAHAN BARU: Menerima input email dari form HRD
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // 👈 TAMBAHAN BARU: Menerima input password sementara
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsDateString()
  @IsOptional()
  joinDate?: string; // Dibuat opsional karena service punya fallback (tanggal hari ini)

  @IsEnum(EmploymentStatus)
  @IsOptional()
  employmentStatus?: EmploymentStatus;

  @IsString()
  @IsOptional()
  departmentId?: string;

  @IsString()
  @IsOptional()
  managerId?: string;
}