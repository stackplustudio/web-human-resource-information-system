import { Controller, Get, Post, Body, Query, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.performanceService.findAll(tenantId);
  }

  @Get('my-goals')
  findMyGoals(@Request() req: any) {
    // Seperti biasa, id diambil otomatis dari JWT
    const targetId = req.user.userId || req.user.sub || req.user.id;
    return this.performanceService.findMyGoals(targetId);
  }

  @Post()
  createGoal(@Body() body: any) {
    return this.performanceService.createGoal(body);
  }

  @Patch(':id/score')
  updateScore(@Param('id') id: string, @Body('score') score: number) {
    return this.performanceService.updateScore(id, score);
  }
}