'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminReportsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = () => {
    setIsExporting(true);
    // Simulasi proses export data
    setTimeout(() => {
      toast.success('Laporan CSV berhasil diunduh!');
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Laporan & Analitik</h1>
        <p className="text-gray-600 font-medium mt-1">Unduh rekapitulasi data kehadiran, cuti, dan penggajian karyawan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Modul Export Kehadiran */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-500/20 text-[#0052FF] rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-2">Rekap Kehadiran (Presensi)</h2>
            <p className="text-gray-600 font-medium text-sm mb-8">Ekspor data jam masuk, jam pulang, dan status keterlambatan seluruh karyawan dalam format CSV.</p>
          </div>
          
          <button 
            onClick={handleExportCSV}
            disabled={isExporting}
            className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold hover:bg-black hover:shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            {isExporting ? 'Memproses Ekspor...' : 'Unduh Laporan Kehadiran'}
          </button>
        </div>

        {/* Modul Export Payroll */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-green-500/20 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 className="text-xl font-extrabold text-[#1A1A1A] mb-2">Rekap Penggajian (Payroll)</h2>
            <p className="text-gray-600 font-medium text-sm mb-8">Ekspor rincian gaji pokok, tunjangan, potongan, dan net salary untuk kebutuhan akuntansi.</p>
          </div>
          
          <button 
            onClick={handleExportCSV}
            disabled={isExporting}
            className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold hover:bg-black hover:shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            {isExporting ? 'Memproses Ekspor...' : 'Unduh Laporan Payroll'}
          </button>
        </div>

      </div>
    </div>
  );
}