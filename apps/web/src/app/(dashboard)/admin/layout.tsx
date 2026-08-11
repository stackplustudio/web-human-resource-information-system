'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, loading } = useAuth();

  // FIX: Gunakan useEffect untuk pengalihan halaman agar tidak error render
  useEffect(() => {
    if (!loading && session && session.role !== 'COMPANY_ADMIN' && session.role !== 'SUPER_ADMIN') {
      router.replace('/employee');
    }
  }, [session, loading, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return null;

  // Jika belum login atau bukan admin, jangan render apa pun sementara diredirect
  if (session && session.role !== 'COMPANY_ADMIN' && session.role !== 'SUPER_ADMIN') {
    return null;
  }

  // Fungsi helper untuk mengecek menu aktif
  const isActive = (path: string) => pathname.includes(path) || (pathname === '/admin' && path === '/admin');

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#E8F0FE] via-[#F5F1E8] to-[#D0E2FF] font-sans overflow-hidden">
      
      <aside className="w-72 m-4 lg:m-6 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem] flex flex-col justify-between shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] z-10 relative">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Sidebar (Tetap diam/Fixed) */}
          <div className="h-20 lg:h-24 flex items-center px-8 border-b border-white/40 shrink-0">
            <Image 
              src="/logo.png" 
              alt="Logo StackPlus Admin" 
              width={140} 
              height={40} 
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          
          {/* Area Menu (Scrollable untuk layar kecil) */}
          <nav className="p-4 lg:p-6 space-y-6 overflow-y-auto scrollbar-hide flex-1">
            
            {/* GRUP 1: CORE HR */}
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold text-[#0052FF] uppercase tracking-widest px-4 mb-2">Core HR</p>
              <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin') && pathname === '/admin' ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Dashboard Pusat
              </Link>
              <Link href="/admin/employees" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/employees') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                Karyawan
              </Link>
              <Link href="/admin/attendances" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/attendances') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Kehadiran
              </Link>
              <Link href="/admin/leaves" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/leaves') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Cuti & Izin
              </Link>
            </div>

            {/* GRUP 2: FINANCE */}
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold text-[#0052FF] uppercase tracking-widest px-4 mb-2">Finance</p>
              <Link href="/admin/payroll" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/payroll') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Payroll
              </Link>
              <Link href="/admin/taxes" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/taxes') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"></path></svg>
                Pajak & BPJS
              </Link>
            </div>

            {/* GRUP 3: TALENT */}
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold text-[#0052FF] uppercase tracking-widest px-4 mb-2">Talent</p>
              <Link href="/admin/performance" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/performance') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                Kinerja (KPI)
              </Link>
              <Link href="/admin/recruitment" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/recruitment') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Rekrutmen
              </Link>
            </div>
            
            {/* GRUP 4: DATA */}
            <div className="space-y-2 pb-4">
              <Link href="/admin/reports" className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${isActive('/admin/reports') ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30' : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Laporan Export
              </Link>
            </div>
          </nav>
        </div>

        {/* Tombol Logout (Tetap diam di bawah) */}
        <div className="p-4 lg:p-6 border-t border-white/40 shrink-0">
          <button onClick={handleLogout} className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 w-full rounded-2xl font-bold text-sm text-red-600 bg-red-500/10 hover:bg-red-500/20 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span className="hidden lg:inline">Keluar Sistem</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}