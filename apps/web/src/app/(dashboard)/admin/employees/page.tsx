'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function CreateEmployeePage() {
  const router = useRouter();
  const { session, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    position: '',
    employmentStatus: 'ACTIVE',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.tenant?.id) return toast.error('Sesi tidak valid');
    
    setIsSubmitting(true);
    try {
      // Endpoint ini akan menembak ke backend untuk membuat Akun sekaligus Profil Karyawan
      await api.post('/employees', {
        ...formData,
        tenantId: session.tenant.id,
      });
      toast.success('Karyawan berhasil ditambahkan & akun dibuat!');
      router.push('/admin/employees');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal menambahkan karyawan');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header Glass */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Pendaftaran Karyawan Baru</h1>
          <p className="text-gray-600 font-medium mt-1">Sistem akan secara otomatis membuatkan kredensial login (email & password).</p>
        </div>
        <button 
          onClick={() => router.back()}
          className="bg-white/60 text-[#1A1A1A] px-6 py-3 rounded-xl font-bold border border-white/80 hover:bg-white hover:shadow-sm transition-all"
        >
          Kembali
        </button>
      </div>

      {/* Form Glass */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/60 p-10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Nama Lengkap</label>
              <input 
                type="text" required placeholder="Budi Cahyono"
                className="w-full px-5 py-4 bg-white/50 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 outline-none backdrop-blur-sm"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Posisi / Jabatan</label>
              <input 
                type="text" required placeholder="Full Stack Web Developer"
                className="w-full px-5 py-4 bg-white/50 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 outline-none backdrop-blur-sm"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              />
            </div>
          </div>

          <hr className="border-white/60 my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Email Log-in (Akun)</label>
              <input 
                type="email" required placeholder="budi@stackplus.com"
                className="w-full px-5 py-4 bg-white/50 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 outline-none backdrop-blur-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Password Log-in Sementara</label>
              <input 
                type="password" required placeholder="••••••••"
                className="w-full px-5 py-4 bg-white/50 border border-white/60 text-[#1A1A1A] rounded-2xl focus:ring-4 focus:ring-[#0052FF]/20 outline-none backdrop-blur-sm"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" disabled={isSubmitting}
              className="w-full bg-[#0052FF] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-[0_8px_30px_rgb(0,82,255,0.4)] transition-all transform hover:-translate-y-1 disabled:opacity-70"
            >
              {isSubmitting ? 'Memproses Pendaftaran...' : 'Daftarkan Karyawan & Buat Akun'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}