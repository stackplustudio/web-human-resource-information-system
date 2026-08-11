'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

// Dummy data untuk visualisasi UI KPI
const dummyKPI = [
  { id: '1', name: 'Budi Cahyono', position: 'Full Stack Web Developer', target: 'Deploy 5 Fitur Utama HRIS', score: 95, status: 'EXCELLENT' },
  { id: '2', name: 'Annisa Mardhotila', position: 'UI/UX Designer', target: 'Redesign 10 Halaman Portal', score: 88, status: 'GOOD' },
];

export default function AdminPerformancePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveReviews = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Semua penilaian kinerja berhasil disimpan!');
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header Glassmorphism */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Manajemen Kinerja (KPI)</h1>
          <p className="text-gray-600 font-medium mt-1">Tetapkan target dan evaluasi skor performa karyawan secara berkala.</p>
        </div>
        <button 
          onClick={handleSaveReviews}
          disabled={isSaving}
          className="bg-gradient-to-r from-[#0052FF] to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-[0_8px_30px_rgb(0,82,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          {isSaving ? 'Menyimpan Data...' : 'Simpan Semua Penilaian'}
        </button>
      </div>

      {/* Tabel Evaluasi Kinerja */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/40 text-sm text-gray-500 uppercase tracking-wider">
                <th className="p-6 font-bold">Karyawan</th>
                <th className="p-6 font-bold">Target Utama (Objectives)</th>
                <th className="p-6 font-bold">Skor (0-100)</th>
                <th className="p-6 font-bold">Predikat</th>
                <th className="p-6 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {dummyKPI.map((kpi) => (
                <tr key={kpi.id} className="hover:bg-white/40 transition-colors duration-200">
                  <td className="p-6">
                    <p className="font-extrabold text-[#1A1A1A]">{kpi.name}</p>
                    <p className="text-sm font-medium text-gray-500">{kpi.position}</p>
                  </td>
                  <td className="p-6">
                    <input 
                      type="text" 
                      defaultValue={kpi.target}
                      className="w-full bg-white/50 border border-white/60 text-[#1A1A1A] px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#0052FF]/50 outline-none backdrop-blur-sm"
                    />
                  </td>
                  <td className="p-6">
                    <input 
                      type="number" 
                      defaultValue={kpi.score}
                      className="w-20 bg-white/50 border border-white/60 text-[#1A1A1A] font-bold px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#0052FF]/50 outline-none text-center backdrop-blur-sm"
                    />
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                      kpi.status === 'EXCELLENT' ? 'bg-green-500/20 text-green-700 border border-green-500/30' : 
                      'bg-blue-500/20 text-blue-700 border border-blue-500/30'
                    }`}>
                      {kpi.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="bg-white/50 text-[#1A1A1A] px-4 py-2 rounded-xl font-bold border border-white/80 hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}