import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Sesuai aturan boilerplate StackPlus

@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.create(createAttendanceDto);
  }

  // Endpoint serbaguna: GET /attendances?tenantId=123 atau GET /attendances?employeeId=456
  @Get()
  findAll(
    @Query('tenantId') tenantId?: string,
    @Query('employeeId') employeeId?: string,
  ) {
    if (tenantId) {
      return this.attendancesService.findAllByTenant(tenantId);
    }
    if (employeeId) {
      return this.attendancesService.findAllByEmployee(employeeId);
    }
    return { error: 'Please provide either tenantId or employeeId query parameter' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendancesService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendancesService.remove(id);
  }
}