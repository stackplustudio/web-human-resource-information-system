'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboardPage() {
  const { session, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      
      {/* HEADER SECTION (GLASS EFFECT) */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
        <p className="text-sm font-bold text-[#0052FF] tracking-widest uppercase mb-1">Pusat Kendali HR</p>
        <h1 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
          Selamat bekerja, Tim HRD! 🚀
        </h1>
        <p className="text-gray-600 font-medium mt-2">Berikut adalah ringkasan aktivitas karyawan perusahaan Anda hari ini.</p>
      </div>

      {/* STATISTIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] hover:-translate-y-2 transition-transform duration-300">
          <div className="w-12 h-12 bg-blue-500/20 text-[#0052FF] rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Karyawan</p>
          <p className="text-4xl font-extrabold text-[#1A1A1A] mt-2">24</p>
        </div>

        <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] hover:-translate-y-2 transition-transform duration-300">
          <div className="w-12 h-12 bg-green-500/20 text-green-600 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Hadir Hari Ini</p>
          <p className="text-4xl font-extrabold text-green-600 mt-2">18</p>
        </div>

        <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] hover:-translate-y-2 transition-transform duration-300">
          <div className="w-12 h-12 bg-yellow-500/20 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Cuti Pending</p>
          <p className="text-4xl font-extrabold text-yellow-600 mt-2">3</p>
        </div>
      </div>
    </div>
  );
}