'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export default function EmployeeDashboard() {
  const { session, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ leaveType: 'Cuti Tahunan', startDate: '', endDate: '', reason: '' });

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0052FF] border-t-transparent rounded-full animate-spin mb-4 shadow-lg shadow-blue-500/50"></div>
        <p className="text-gray-700 font-bold tracking-wide">Sinkronisasi Ruang Kerja...</p>
      </div>
    );
  }

  const currentTenantId = session?.tenant?.id;
  const currentEmployeeId = session?.employee?.id;
  const employeeName = session?.employee?.fullName || 'Bintang StackPlus';
  const roleName = session?.role || 'Team Member';
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleCheckIn = async () => {
    setIsSubmitting(true);
    try {
      await api.post('/attendances', {
        tenantId: currentTenantId,
        employeeId: currentEmployeeId,
        date: new Date().toISOString().split('T')[0],
        checkIn: new Date().toISOString(),
        status: 'PRESENT',
      });
      toast.success('Kehadiran berhasil dicatat!');
    } catch (error) {
      toast.error('Gagal mencatat kehadiran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/leaves', {
        tenantId: currentTenantId,
        employeeId: currentEmployeeId,
        ...leaveForm,
      });
      toast.success('Pengajuan cuti meluncur ke HR!');
      setLeaveForm({ leaveType: 'Cuti Tahunan', startDate: '', endDate: '', reason: '' });
    } catch (error) {
      toast.error('Gagal memproses pengajuan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      
      {/* HEADER SECTION (GLASS EFFECT) */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex justify-between items-center">
        <div>
          <p className="text-sm font-bold text-[#0052FF] tracking-widest uppercase mb-1">{roleName}</p>
          <h1 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
            Selamat datang, {employeeName.split(' ')[0]}! ✨
          </h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-gray-600 font-medium">Hari ini</p>
          <p className="text-xl font-bold text-[#1A1A1A]">{today}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* WIDGET KIRI: PRESENSI KACA */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] relative overflow-hidden group">
            {/* Hiasan Cahaya di dalam card */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 to-transparent rotate-45 transform pointer-events-none"></div>
            
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-8 relative z-10">Terminal Kehadiran</h2>
            
            <div className="flex flex-col gap-5 relative z-10">
              <button 
                onClick={handleCheckIn}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#0052FF] to-blue-500 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-[0_8px_30px_rgb(0,82,255,0.4)] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                Check-In Sekarang
              </button>
              
              <button 
                disabled={true} 
                className="w-full bg-white/40 text-gray-400 py-5 rounded-2xl font-bold text-lg border border-white/60 cursor-not-allowed flex items-center justify-center gap-3 backdrop-blur-md"
              >
                Check-Out Pulang
              </button>
            </div>
          </div>

          {/* MINI STATS WIDGET */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-sm">
              <p className="text-sm text-gray-600 font-bold mb-1">Sisa Cuti</p>
              <p className="text-3xl font-extrabold text-[#1A1A1A]">12 <span className="text-base text-gray-500 font-medium">Hari</span></p>
            </div>
            <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-sm">
              <p className="text-sm text-gray-600 font-bold mb-1">Kehadiran</p>
              <p className="text-3xl font-extrabold text-green-600">100<span className="text-base text-green-600/70 font-medium">%</span></p>
            </div>
          </div>
        </div>

        {/* WIDGET KANAN: FORM CUTI KACA */}
        <div className="lg:col-span-7">
          <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-8 md:p-10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-2">Formulir Pengajuan</h2>
            <p className="text-gray-600 mb-8 font-medium">Sistem HR terintegrasi. Pengajuan Anda akan langsung diteruskan.</p>
            
            <form onSubmit={handleLeaveSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2 drop-shadow-sm">Kategori Ketidakhadiran</label>
                <select 
                  className="w-full px-5 py-4 bg-white/40 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 focus:border-[#0052FF] focus:bg-white/70 transition-all outline-none appearance-none font-bold backdrop-blur-sm"
                  value={leaveForm.leaveType}
                  onChange={(e) => setLeaveForm({...leaveForm, leaveType: e.target.value})}
                >
                  <option value="Cuti Tahunan">🏝️ Cuti Tahunan</option>
                  <option value="Sakit">🤒 Sakit (dengan Surat Dokter)</option>
                  <option value="Cuti Menikah">💍 Cuti Menikah</option>
                  <option value="Cuti Melahirkan">👶 Cuti Melahirkan</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2 drop-shadow-sm">Dari Tanggal</label>
                  <input 
                    type="date" required
                    className="w-full px-5 py-4 bg-white/40 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 focus:border-[#0052FF] focus:bg-white/70 transition-all outline-none font-bold backdrop-blur-sm"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2 drop-shadow-sm">Sampai Tanggal</label>
                  <input 
                    type="date" required
                    className="w-full px-5 py-4 bg-white/40 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 focus:border-[#0052FF] focus:bg-white/70 transition-all outline-none font-bold backdrop-blur-sm"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2 drop-shadow-sm">Pesan untuk HR</label>
                <textarea 
                  rows={3} required
                  className="w-full px-5 py-4 bg-white/40 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 focus:border-[#0052FF] focus:bg-white/70 transition-all outline-none resize-none font-medium backdrop-blur-sm"
                  placeholder="Ceritakan detail ketidakhadiran Anda..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-black hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 disabled:opacity-70 mt-4 transform hover:-translate-y-1"
              >
                {isSubmitting ? 'Mengirim Data Terenkripsi...' : 'Kirim Pengajuan Resmi'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}