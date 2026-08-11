'use client';

import { useAuth } from '@/hooks/useAuth';

export default function EmployeePerformancePage() {
  const { session, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">Target & Pencapaian Anda</h1>
        <p className="text-gray-600 font-medium">Pantau Key Performance Indicators (KPI) dan ulasan dari manajemen.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Skor Keseluruhan */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] text-center relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 to-transparent rotate-45 transform pointer-events-none"></div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Skor Kinerja Saat Ini</p>
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-green-500/20 mb-4">
              <span className="text-5xl font-extrabold text-green-600">95</span>
            </div>
            <p className="text-xl font-bold text-[#1A1A1A]">Luar Biasa (Excellent)</p>
          </div>
        </div>

        {/* Daftar Target */}
        <div className="lg:col-span-2">
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-6">Daftar Objektif (Q3 2026)</h2>
            
            <div className="space-y-4">
              <div className="bg-white/40 p-6 rounded-2xl border border-white/60 flex items-start gap-4">
                <div className="mt-1 bg-[#0052FF]/10 text-[#0052FF] p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Deploy 5 Fitur Utama HRIS</h3>
                  <p className="text-gray-600 font-medium mt-1">Selesaikan modul Auth, Employee, Leave, Attendance, dan Payroll tepat waktu.</p>
                  <div className="mt-4 w-full bg-white/50 rounded-full h-2.5">
                    <div className="bg-[#0052FF] h-2.5 rounded-full w-[100%] shadow-[0_0_10px_rgba(0,82,255,0.5)]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 p-6 rounded-2xl border border-white/60 flex items-start gap-4">
                <div className="mt-1 bg-yellow-500/10 text-yellow-600 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Optimasi Query Database Prisma</h3>
                  <p className="text-gray-600 font-medium mt-1">Turunkan response time API di bawah 100ms.</p>
                  <div className="mt-4 w-full bg-white/50 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full w-[60%] shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}