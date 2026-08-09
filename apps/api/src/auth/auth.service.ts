import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 1. Validasi kredensial (Email & Password)
  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.prisma.user.findUnique({
  //     where: { email },
  //   });

  //   if (user && (await bcrypt.compare(pass, user.password))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('\n--- 🕵️‍♂️ DEBUG LOGIN DIMULAI ---');
    console.log('1. Email dari Frontend   :', email);
    console.log('2. Password dr Frontend  :', pass);

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    console.log('3. Cek Database Neon     :', user ? '✅ AKUN KETEMU' : '❌ AKUN TIDAK ADA');

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      console.log('4. Hasil Cocok Password  :', isMatch ? '✅ COCOK' : '❌ GAGAL BCRYPT');

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    
    console.log('--- ❌ LOGIN DITOLAK ---\n');
    return null;
  }

  // 2. Generate Tokens (Access & Refresh)
  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role // PERBAIKAN: role adalah string, bukan object
    };

    // Access token untuk dikirim ke memory frontend
    const accessToken = this.jwtService.sign(payload);
    
    // Refresh token untuk disimpan di HTTP-Only Cookie (umur 7 hari)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-cahyodev',
      expiresIn: '7d',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // PERBAIKAN: disesuaikan menjadi string
      },
      access_token: accessToken, // PERBAIKAN: disamakan dengan tarikan Next.js
      refreshToken,
    };
  }
}