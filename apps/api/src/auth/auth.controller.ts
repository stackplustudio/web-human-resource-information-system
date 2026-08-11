import { Controller, Post, Body, UnauthorizedException, Res, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard'; 
import { PrismaService } from '../prisma/prisma.service'; 

@Controller('auth')
export class AuthController {
  // Tambahkan PrismaService ke dalam constructor
  constructor(
    private authService: AuthService,
    private prisma: PrismaService
  ) {}

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    // 1. Cek kredensial via Service
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Email atau Password salah');
    }

    // 2. Jika valid, buat token
    const tokens = await this.authService.login(user);

    // 3. Simpan Refresh Token ke HTTP-Only Cookie (sangat aman)
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true di production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    // 4. Kembalikan Access Token ke frontend untuk disimpan di memory
    return {
      message: 'Login berhasil',
      user: tokens.user,
      access_token: tokens.access_token,
    };
  }

  // --- TAMBAHAN BARU: Pintu untuk hook useAuth di Frontend ---
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    // FIX: Gunakan fallback penamaan dari JWT Strategy bawaan NestJS
    const targetId = req.user.userId || req.user.sub || req.user.id;

    // Cari user beserta relasi Employee dan Tenant-nya
    const user = await this.prisma.user.findUnique({
      where: { id: targetId }, // 👈 Prisma tidak akan teriak undefined lagi
      include: {
        employee: {
          include: { tenant: true }
        }
      }
    });

    // Kembalikan data yang rapi ke Frontend
    return {
      userId: user?.id,
      email: user?.email,
      role: user?.role,
      employee: user?.employee ? { id: user.employee.id, fullName: user.employee.fullName } : null,
      tenant: user?.employee?.tenant ? { id: user.employee.tenant.id, name: user.employee.tenant.name } : null,
    };
  }
}