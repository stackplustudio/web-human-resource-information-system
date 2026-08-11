import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.payrollService.findAll(tenantId);
  }

  @Get('my-payslips')
  findMyPayslips(@Request() req: any) {
    const targetId = req.user.userId || req.user.sub || req.user.id;
    // Asumsi: di production kamu ambil employeeId yang berelasi dengan userId ini
    // Untuk MVP, kita langsung kirim ke service
    return this.payrollService.findMyPayslips(targetId); 
  }

  @Post('generate')
  generateMonthly(@Body() body: { tenantId: string; period: string }) {
    return this.payrollService.generateMonthly(body.tenantId, body.period);
  }
}