'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#E8F0FE] via-[#F5F1E8] to-[#D0E2FF] font-sans overflow-hidden">
      
      <aside className="w-72 m-6 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem] flex flex-col justify-between shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] z-10 relative">
        <div>
          <div className="h-24 flex items-center px-8 border-b border-white/40">
            <Image 
              src="/logo.png" 
              alt="Logo StackPlus" 
              width={160} 
              height={50} 
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          
          <nav className="p-6 space-y-3 mt-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 mb-4">Menu Utama</p>
            
            <Link 
              href="/employee" 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                pathname === '/employee' 
                  ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30 backdrop-blur-md' 
                  : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Dashboard
            </Link>
            
            <Link 
              href="/employee/leaves" 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                pathname === '/employee/leaves' 
                  ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30 backdrop-blur-md' 
                  : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Riwayat Cuti
            </Link>
            
            <Link 
              href="/employee/payslips" 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                pathname === '/employee/payslips' 
                  ? 'bg-[#0052FF]/90 text-white shadow-lg shadow-blue-500/30 backdrop-blur-md' 
                  : 'text-gray-700 hover:bg-white/50 hover:text-[#0052FF]'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Slip Gaji
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/40">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-4 w-full text-left rounded-2xl font-bold text-red-600 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-md transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Keluar Akun
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}