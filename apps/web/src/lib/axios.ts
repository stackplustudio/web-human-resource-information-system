import axios from 'axios';

export const api = axios.create({
  // PENTING: Gunakan Environment Variable saat di Vercel, fallback ke localhost saat develop
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Otomatis menempelkan JWT Token ke setiap request ke backend
api.interceptors.request.use(
  (config) => {
    // Pengaman: Pastikan kode ini hanya berjalan di browser (Client-Side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);