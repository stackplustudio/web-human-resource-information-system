'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      // Cek apakah token ada di memori browser
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await api.get('/auth/profile'); 
        setSession(res.data);
      } catch (error) {
        console.error('Sesi JWT kadaluarsa, silakan login ulang.');
        localStorage.removeItem('token'); // Bersihkan token rusak
        router.push('/login'); // Kembalikan ke gerbang depan
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  return { session, loading };
}