'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';

export default function NewEmployeePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    joinDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Hardcode tenantId & userId sementara untuk MVP testing
      const payload = {
        ...formData,
        tenantId: 'ganti-dengan-id-tenant-hasil-seeding-nanti',
        userId: 'ganti-dengan-id-user-hasil-seeding-nanti', 
        employmentStatus: 'ACTIVE',
      };

      await api.post('/employees', payload);
      toast.success('Karyawan berhasil ditambahkan!');
      router.push('/admin/employees'); // Kembali ke tabel setelah sukses
    } catch (error: any) {
      toast.error('Gagal menambahkan data karyawan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Tambah Karyawan</h1>
        <p className="text-gray-600 mb-8">Masukkan data profil karyawan baru</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E0D5] space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-[#E5E0D5] rounded-lg focus:ring-[#2F5EFF]"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posisi / Jabatan</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-[#E5E0D5] rounded-lg focus:ring-[#2F5EFF]"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bergabung</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-[#E5E0D5] rounded-lg focus:ring-[#2F5EFF]"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-[#E5E0D5] rounded-full text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#2F5EFF] text-white rounded-full hover:bg-blue-700 disabled:opacity-70"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan Karyawan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}