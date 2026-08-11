import { Controller, Get, Body, Query, UseGuards, Put } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Get('config')
  getConfig(@Query('tenantId') tenantId: string) {
    return this.taxesService.getConfig(tenantId);
  }

  @Put('config')
  updateConfig(@Body() body: any) {
    return this.taxesService.updateConfig(body.tenantId, body);
  }
}