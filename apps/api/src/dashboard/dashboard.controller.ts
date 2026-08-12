import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(@Query('tenantId') tenantId: string) {
    // 👇 NAMA FUNGSI DIUBAH DI SINI! 👇
    return this.dashboardService.getDashboardStats(tenantId); 
  }
}