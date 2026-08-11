'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

interface Leave {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  employee: { fullName: string };
}

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const currentTenantId = "ganti-dengan-id-tenant-hasil-seeding-nanti";
  const currentTenantId = '513ff8f1-d7a9-4869-8fe1-4f44ab6587c3';

  const fetchLeaves = async () => {
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
    fetchLeaves();
  }, []);

  const handleAction = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      await api.patch(`/leaves/${id}/status`, { 
        status: newStatus,
        approvedBy: 'Super Admin' 
      });
      toast.success(`Cuti berhasil di-${newStatus.toLowerCase()}`);
      fetchLeaves(); // Refresh tabel setelah aksi
    } catch (error) {
      toast.error('Gagal memproses cuti');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#F5F1E8]">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Persetujuan Cuti</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D5] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-[#E5E0D5] text-sm text-gray-500">
              <th className="p-4 font-medium">KARYAWAN</th>
              <th className="p-4 font-medium">TIPE CUTI</th>
              <th className="p-4 font-medium">TANGGAL</th>
              <th className="p-4 font-medium">STATUS</th>
              <th className="p-4 font-medium text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D5]">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center">Memuat...</td></tr>
            ) : leaves.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">Tidak ada pengajuan cuti.</td></tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold">{leave.employee.fullName}</td>
                  <td className="p-4">{leave.leaveType}</td>
                  <td className="p-4 text-sm">
                    {new Date(leave.startDate).toLocaleDateString('id-ID')} - {new Date(leave.endDate).toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      leave.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      leave.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {leave.status === 'PENDING' && (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleAction(leave.id, 'APPROVED')} className="text-green-600 hover:underline text-sm font-medium">Setujui</button>
                        <button onClick={() => handleAction(leave.id, 'REJECTED')} className="text-red-600 hover:underline text-sm font-medium">Tolak</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}