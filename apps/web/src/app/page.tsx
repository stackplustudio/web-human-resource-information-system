import { redirect } from 'next/navigation';

export default function HomePage() {
  // Sistem HRIS StackPlus menggunakan SSO Gate.
  // Semua pengunjung di root (/) langsung diarahkan ke gerbang login.
  redirect('/login');
}