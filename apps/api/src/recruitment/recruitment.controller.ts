import { Controller, Get, Post, Body, Query, UseGuards, Patch, Param } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.recruitmentService.findAll(tenantId);
  }

  @Post()
  createCandidate(@Body() body: any) {
    return this.recruitmentService.createCandidate(body);
  }

  @Patch(':id/stage')
  updateStage(@Param('id') id: string, @Body('stage') stage: string) {
    return this.recruitmentService.updateStage(id, stage);
  }
}