'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

interface Attendance {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  employee: { fullName: string; position: string };
}

export default function AttendancesPage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const currentTenantId = "ganti-dengan-id-tenant-hasil-seeding-nanti";
  const currentTenantId = '513ff8f1-d7a9-4869-8fe1-4f44ab6587c3';

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await api.get(`/attendances?tenantId=${currentTenantId}`);
        setAttendances(response.data);
      } catch (error) {
        toast.error('Gagal memuat data absensi');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendances();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-[#F5F1E8]">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Rekap Absensi Harian</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D5] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-[#E5E0D5] text-sm text-gray-500">
              <th className="p-4 font-medium">TANGGAL</th>
              <th className="p-4 font-medium">KARYAWAN</th>
              <th className="p-4 font-medium">CHECK IN</th>
              <th className="p-4 font-medium">CHECK OUT</th>
              <th className="p-4 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D5]">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center">Memuat...</td></tr>
            ) : attendances.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">Belum ada data absensi.</td></tr>
            ) : (
              attendances.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50">
                  <td className="p-4">{new Date(att.date).toLocaleDateString('id-ID')}</td>
                  <td className="p-4">
                    <p className="font-semibold">{att.employee.fullName}</p>
                    <p className="text-xs text-gray-400">{att.employee.position}</p>
                  </td>
                  <td className="p-4">{att.checkIn ? new Date(att.checkIn).toLocaleTimeString('id-ID') : '-'}</td>
                  <td className="p-4">{att.checkOut ? new Date(att.checkOut).toLocaleTimeString('id-ID') : '-'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      att.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 
                      att.status === 'LATE' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {att.status}
                    </span>
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