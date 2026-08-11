'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

interface Leave {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
  employee?: { fullName: string };
}

export default function AdminLeavesPage() {
  const { session, loading: authLoading } = useAuth();
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaves = async () => {
    const currentTenantId = session?.tenant?.id;
    if (!currentTenantId) return;

    try {
      const response = await api.get(`/leaves?tenantId=${currentTenantId}`);
      setLeaves(response.data);
    } catch (error) {
      toast.error('Gagal memuat data cuti');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) fetchLeaves();
  }, [session, authLoading]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      // Menembak endpoint update (asumsi: PATCH /leaves/:id)
      await api.patch(`/leaves/${id}`, { status: newStatus });
      toast.success(`Cuti berhasil di-${newStatus.toLowerCase()}`);
      fetchLeaves(); // Refresh tabel setelah update
    } catch (error) {
      toast.error('Gagal memperbarui status cuti');
    }
  };

  if (authLoading) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Persetujuan Cuti</h1>
        <p className="text-gray-600 font-medium mt-1">Validasi pengajuan ketidakhadiran karyawan Anda di sini.</p>
      </div>

      <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/40 text-sm text-gray-500 uppercase tracking-wider">
                <th className="p-6 font-bold">Karyawan</th>
                <th className="p-6 font-bold">Tipe Cuti</th>
                <th className="p-6 font-bold">Tanggal</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Aksi HRD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500 font-bold">Menyinkronkan data...</td>
                </tr>
              ) : leaves.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500 font-bold">Tidak ada pengajuan cuti.</td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-white/40 transition-colors duration-200">
                    <td className="p-6 font-extrabold text-[#1A1A1A]">{leave.employee?.fullName || 'Karyawan'}</td>
                    <td className="p-6 font-medium text-gray-700">{leave.leaveType}</td>
                    <td className="p-6">
                      <p className="font-bold text-[#1A1A1A]">
                        {new Date(leave.startDate).toLocaleDateString('id-ID')}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        s/d {new Date(leave.endDate).toLocaleDateString('id-ID')}
                      </p>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                        leave.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30' :
                        leave.status === 'APPROVED' ? 'bg-green-500/20 text-green-700 border border-green-500/30' : 
                        'bg-red-500/20 text-red-700 border border-red-500/30'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="p-6 text-right space-x-2 whitespace-nowrap">
                      {leave.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(leave.id, 'APPROVED')}
                            className="bg-green-500/10 text-green-700 px-4 py-2 rounded-xl font-bold border border-green-500/30 hover:bg-green-500 hover:text-white transition-all"
                          >
                            Setujui
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(leave.id, 'REJECTED')}
                            className="bg-red-500/10 text-red-700 px-4 py-2 rounded-xl font-bold border border-red-500/30 hover:bg-red-600 hover:text-white transition-all"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}