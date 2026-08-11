import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecruitmentService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.candidate.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCandidate(data: { tenantId: string; name: string; role: string }) {
    return this.prisma.candidate.create({
      data: {
        tenantId: data.tenantId,
        name: data.name,
        role: data.role,
        stage: 'APPLIED',
      },
    });
  }

  async updateStage(id: string, stage: string) {
    return this.prisma.candidate.update({
      where: { id },
      data: { stage },
    });
  }
}