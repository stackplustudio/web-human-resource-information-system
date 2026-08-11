'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';

export default function EmployeePayslipsPage() {
  const { session, loading } = useAuth();
  const [payslips, setPayslips] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyPayslips = async () => {
      try {
        // Nembak ke backend untuk ambil history gaji khusus user ini
        const res = await api.get('/payroll/my-payslips');
        setPayslips(res.data);
      } catch (error) {
        console.error('Gagal memuat slip gaji');
      }
    };
    if (!loading) fetchMyPayslips();
  }, [loading]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  if (loading) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">Slip Gaji Elektronik</h1>
        <p className="text-gray-600 font-medium">Unduh dokumen distribusi kompensasi bulanan Anda dengan aman.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payslips.length === 0 ? (
          <div className="col-span-3 p-12 text-center text-gray-500 font-bold bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem]">
            Belum ada slip gaji yang diterbitkan untuk Anda.
          </div>
        ) : payslips.map((slip) => (
          <div key={slip.id} className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] hover:-translate-y-2 transition-transform duration-300 group">
            
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#0052FF]/10 text-[#0052FF] rounded-2xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-700 border border-green-500/30 rounded-lg text-xs font-bold tracking-wider">
                {slip.status === 'PAID' ? 'LUNAS' : slip.status}
              </span>
            </div>

            <div className="space-y-1 mb-8">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Periode</p>
              <p className="text-2xl font-extrabold text-[#1A1A1A]">{slip.period}</p>
              <p className="text-sm font-medium text-gray-600 pt-2">{formatRupiah(slip.netSalary)}</p>
            </div>

            <button className="w-full bg-white/50 text-[#1A1A1A] py-4 rounded-2xl font-bold border border-white/80 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300 flex justify-center items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Unduh PDF
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}