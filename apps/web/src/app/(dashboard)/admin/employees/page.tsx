'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Definisi tipe data berdasarkan struktur respons dari Backend NestJS
interface Employee {
  id: string;
  fullName: string;
  position: string;
  employmentStatus: string;
  user: { email: string };
  department?: { name: string };
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Asumsi: tenantId masih di-hardcode untuk testing UI awal
  // const currentTenantId = "ganti-dengan-id-tenant-hasil-seeding-nanti";
  const currentTenantId = '513ff8f1-d7a9-4869-8fe1-4f44ab6587c3';

  const fetchEmployees = async () => {
    try {
      const response = await api.get(`/employees?tenantId=${currentTenantId}`);
      setEmployees(response.data);
    } catch (error) {
      toast.error('Gagal memuat data karyawan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-[#F5F1E8]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Direktori Karyawan</h1>
          <p className="text-gray-600">Kelola data seluruh anggota tim Anda</p>
        </div>
        <button className="bg-[#2F5EFF] text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm">
          + Tambah Karyawan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E0D5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[#E5E0D5] text-sm text-gray-500">
                <th className="p-4 font-medium">NAMA LENGKAP</th>
                <th className="p-4 font-medium">EMAIL LOG-IN</th>
                <th className="p-4 font-medium">POSISI & DEPARTEMEN</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D5]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    Memuat data karyawan...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    Belum ada data karyawan. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-[#1A1A1A]">{emp.fullName}</p>
                    </td>
                    <td className="p-4 text-gray-600">{emp.user?.email || '-'}</td>
                    <td className="p-4">
                      <p className="text-[#1A1A1A]">{emp.position}</p>
                      <p className="text-xs text-gray-400">{emp.department?.name || 'Tanpa Departemen'}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        emp.employmentStatus === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                        emp.employmentStatus === 'ON_LEAVE' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {emp.employmentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => router.push(`/admin/employees/${emp.id}`)}
                        className="bg-[#2F5EFF] text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm"

                      >
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline text-sm font-medium">Hapus</button>
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