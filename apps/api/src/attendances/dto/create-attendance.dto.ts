import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';

// Samakan dengan enum di schema.prisma
enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
}

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string; // Format: YYYY-MM-DD

  @IsDateString()
  @IsOptional()
  checkIn?: string;

  @IsDateString()
  @IsOptional()
  checkOut?: string;

  @IsEnum(AttendanceStatus)
  @IsNotEmpty()
  status: AttendanceStatus;

  @IsString()
  @IsOptional()
  location?: string;
}