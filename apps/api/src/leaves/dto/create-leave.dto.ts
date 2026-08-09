import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';

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
  leaveType: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsEnum(LeaveStatus)
  @IsOptional()
  status?: LeaveStatus;

  @IsString()
  @IsOptional()
  reason?: string;
}