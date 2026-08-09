import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Proteksi wajib

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Endpoint: GET /dashboard/summary?tenantId=xxx
  @Get('summary')
  getSummary(@Query('tenantId') tenantId: string) {
    if (!tenantId) {
      throw new BadRequestException('tenantId query parameter is required');
    }
    return this.dashboardService.getSummary(tenantId);
  }
}