'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

// Definisi tipe data agar TypeScript tidak protes
interface DashboardData {
  totalEmployees: number;
  attendanceSummary: {
    present: number;
    late: number;
    absent: number;
  };
  pendingLeaves: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Asumsi: tenantId didapatkan dari user profile di context/cookies. 
  // Untuk sementara kita hardcode untuk keperluan testing awal UI
  const currentTenantId = "ganti-dengan-id-tenant-hasil-seeding-nanti"; 

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get(`/dashboard/summary?tenantId=${currentTenantId}`);
        setData(response.data);
      } catch (error) {
        toast.error('Gagal memuat data dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat dashboard...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-[#F5F1E8]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Dashboard HR</h1>
        <p className="text-gray-600">Ringkasan aktivitas hari ini</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget 1: Total Karyawan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D5]">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Karyawan Aktif</h3>
          <p className="text-4xl font-bold text-[#1A1A1A]">{data?.totalEmployees || 0}</p>
        </div>

        {/* Widget 2: Absensi Hari Ini */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D5]">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Absensi Hari Ini</h3>
          <div className="flex gap-4">
            <div>
              <p className="text-2xl font-bold text-[#22C55E]">{data?.attendanceSummary.present || 0}</p>
              <p className="text-xs text-gray-400">Hadir</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#F59E0B]">{data?.attendanceSummary.late || 0}</p>
              <p className="text-xs text-gray-400">Telat</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#EF4444]">{data?.attendanceSummary.absent || 0}</p>
              <p className="text-xs text-gray-400">Absen</p>
            </div>
          </div>
        </div>

        {/* Widget 3: Cuti Pending */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D5]">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Cuti Menunggu Persetujuan</h3>
          <p className="text-4xl font-bold text-[#F59E0B]">{data?.pendingLeaves || 0}</p>
          {data && data.pendingLeaves > 0 && (
            <button className="mt-4 w-full text-sm bg-black text-white py-2 rounded-full hover:bg-gray-800">
              Review Cuti
            </button>
          )}
        </div>
      </div>
    </div>
  );
}