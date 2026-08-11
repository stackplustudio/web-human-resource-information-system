import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaxesService {
  constructor(private prisma: PrismaService) {}

  async getConfig(tenantId: string) {
    let config = await this.prisma.taxBpjsConfig.findUnique({
      where: { tenantId },
    });
    
    // Jika perusahaan belum punya konfigurasi pajak, buatkan default-nya
    if (!config) {
      config = await this.prisma.taxBpjsConfig.create({
        data: { tenantId },
      });
    }
    return config;
  }

  async updateConfig(tenantId: string, data: any) {
    return this.prisma.taxBpjsConfig.upsert({
      where: { tenantId },
      update: {
        bpjsKesehatan: data.bpjsKesehatan,
        bpjsKetenagakerjaan: data.bpjsKetenagakerjaan,
        ptkpDasar: data.ptkpDasar,
      },
      create: {
        tenantId,
        bpjsKesehatan: data.bpjsKesehatan,
        bpjsKetenagakerjaan: data.bpjsKetenagakerjaan,
        ptkpDasar: data.ptkpDasar,
      },
    });
  }
}