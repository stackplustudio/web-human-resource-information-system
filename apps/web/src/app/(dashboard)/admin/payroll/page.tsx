'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export default function AdminPayrollPage() {
  const { session, loading } = useAuth();
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchPayrolls = async () => {
    if (!session?.tenant?.id) return;
    try {
      const res = await api.get(`/payroll?tenantId=${session.tenant.id}`);
      setPayrolls(res.data);
    } catch (error) {
      toast.error('Gagal memuat data payroll');
    }
  };

  useEffect(() => {
    if (!loading) fetchPayrolls();
  }, [session, loading]);

  const handleGeneratePayroll = async () => {
    if (!session?.tenant?.id) return;
    setIsProcessing(true);
    
    // Format periode otomatis, cth: "Agustus 2026"
    const period = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

    try {
      const res = await api.post('/payroll/generate', { tenantId: session.tenant.id, period });
      toast.success(res.data.message);
      fetchPayrolls(); // Refresh tabel
    } catch (error) {
      toast.error('Gagal men-generate payroll');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  if (loading) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Manajemen Penggajian</h1>
          <p className="text-gray-600 font-medium mt-1">Kelola perhitungan gaji bulan {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
        </div>
        <button 
          onClick={handleGeneratePayroll}
          disabled={isProcessing}
          className="bg-gradient-to-r from-[#0052FF] to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-[0_8px_30px_rgb(0,82,255,0.4)] transition-all duration-300 disabled:opacity-70 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          {isProcessing ? 'Menghitung...' : 'Generate Payroll Bulan Ini'}
        </button>
      </div>

      <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/40 text-sm text-gray-500 uppercase tracking-wider">
                <th className="p-6 font-bold">Karyawan</th>
                <th className="p-6 font-bold">Periode</th>
                <th className="p-6 font-bold">Gaji Bersih (Net)</th>
                <th className="p-6 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {payrolls.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500 font-bold">Belum ada data gaji yang di-generate.</td>
                </tr>
              ) : payrolls.map((pay) => (
                <tr key={pay.id} className="hover:bg-white/40 transition-colors duration-200">
                  <td className="p-6">
                    <p className="font-extrabold text-[#1A1A1A]">{pay.employee?.fullName}</p>
                    <p className="text-sm font-medium text-gray-500">{pay.employee?.position}</p>
                  </td>
                  <td className="p-6 font-bold text-gray-700">{pay.period}</td>
                  <td className="p-6 font-extrabold text-[#0052FF]">{formatRupiah(pay.netSalary)}</td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                      pay.status === 'PAID' ? 'bg-green-500/20 text-green-700 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30'
                    }`}>
                      {pay.status === 'PAID' ? 'LUNAS' : 'DRAFT'}
                    </span>
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