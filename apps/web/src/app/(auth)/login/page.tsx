'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios'; // Wajib pakai instance Axios bawaan
import toast from 'react-hot-toast'; // Wajib pakai react-hot-toast

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      
      // 👈 PERBAIKAN: Gunakan localStorage agar lebih stabil di Next.js
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        throw new Error('Token tidak ditemukan dari server');
      }
      
      toast.success('Login berhasil! Selamat datang.');
      
      const userRole = response.data.user.role;
      if (userRole === 'COMPANY_ADMIN' || userRole === 'SUPER_ADMIN') {
        router.push('/admin');
      } else {
        router.push('/employee');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login gagal, periksa kredensial Anda');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">StackPlus HRIS</h1>
          <p className="text-gray-500">Masuk ke ruang kerja Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-[#E5E0D5] rounded-full focus:outline-none focus:border-[#2F5EFF] focus:ring-1 focus:ring-[#2F5EFF]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@perusahaan.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-[#E5E0D5] rounded-full focus:outline-none focus:border-[#2F5EFF] focus:ring-1 focus:ring-[#2F5EFF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2F5EFF] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}