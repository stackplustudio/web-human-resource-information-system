import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';

// Menggunakan enum yang sama dengan schema Prisma
enum EmploymentStatus {
  ACTIVE = 'ACTIVE',
  PROBATION = 'PROBATION',
  ON_LEAVE = 'ON_LEAVE',
  RESIGNED = 'RESIGNED',
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  userId: string; // Relasi ke akun login

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsOptional()
  departmentId?: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsDateString()
  @IsNotEmpty()
  joinDate: string;

  @IsEnum(EmploymentStatus)
  @IsOptional()
  employmentStatus?: EmploymentStatus;

  @IsString()
  @IsOptional()
  managerId?: string;
}