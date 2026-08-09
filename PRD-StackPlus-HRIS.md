# Product Requirements Document (PRD)
## StackPlus HRIS — HR Management SaaS Platform

| | |
|---|---|
| **Dokumen** | PRD-000-01 |
| **Produk** | StackPlus HRIS |
| **Pemilik Produk** | StackPlus Studio |
| **Status** | Draft v1.0 |
| **Tanggal** | 9 Agustus 2026 |
| **Author** | Solo Fullstack Developer / Founder |

---

## 1. Ringkasan Eksekutif

StackPlus HRIS adalah produk SaaS manajemen sumber daya manusia yang dibangun oleh StackPlus Studio, ditujukan untuk startup, studio kreatif, dan bisnis kecil-menengah (UMKM/SME) yang butuh sistem HR modern, ringan, dan mudah dipakai tanpa kompleksitas HRIS enterprise pada umumnya.

Produk ini dibangun sebagai **product studio initiative** — dikerjakan solo oleh satu fullstack developer, sehingga scope MVP harus realistis, modular, dan iteratif. Desain visual mengikuti identitas StackPlus Studio: bersih, modern, minimalis, dengan palet cream/off-white dan aksen biru.

**Tesis produk:** HRIS kompetitor lokal (Gadjian, Talenta, LinovHR) dibangun untuk perusahaan menengah-besar dengan proses sales-heavy dan UI yang terasa "kaku/korporat". StackPlus HRIS menyasar celah pasar: bisnis kecil (5–100 karyawan), khususnya studio kreatif/agency/startup, yang ingin onboarding self-serve, UI modern, dan harga terjangkau.

---

## 2. Latar Belakang & Masalah

### 2.1 Konteks
StackPlus Studio saat ini adalah digital agency (web development, UI/UX, AI chatbot, mobile) dengan tim kecil. Rencana membangun HRIS SaaS berfungsi ganda:
1. Sebagai **produk revenue tambahan** (recurring revenue di luar project-based billing)
2. Sebagai **portfolio/showcase teknis** untuk menarik klien enterprise
3. Sebagai **internal tool** yang nantinya bisa dipakai StackPlus sendiri saat tim berkembang

### 2.2 Masalah yang Dipecahkan
Bisnis kecil-menengah di Indonesia sering menghadapi:
- Pengelolaan absensi & cuti masih manual (Excel, WhatsApp, form kertas)
- Perhitungan payroll (gaji, PPh 21, BPJS, lembur) rawan human error
- Tidak ada visibilitas data karyawan yang terpusat
- HRIS existing terlalu mahal / terlalu kompleks untuk tim kecil
- Onboarding software HR lain butuh sales call & demo, bukan self-serve

### 2.3 Non-Masalah (Out of Scope Awal)
- Bukan untuk perusahaan multinasional dengan ribuan karyawan
- Bukan untuk kompleksitas payroll lintas negara (multi-currency, multi-tax jurisdiction)
- Bukan pengganti sistem ERP penuh (finance, inventory, dll)

---

## 3. Tujuan & Sasaran

### 3.1 Tujuan Bisnis
- Meluncurkan MVP dalam 3–4 bulan (solo developer)
- Mendapatkan 5–10 klien awal (bisa dari jaringan klien StackPlus Studio) dalam 6 bulan pertama
- Validasi model pricing SaaS (recurring revenue) sebagai lini bisnis baru

### 3.2 Tujuan Produk
- Sistem HR inti yang **bekerja dengan baik** untuk kasus penggunaan umum, bukan fitur lengkap tapi setengah matang
- UI/UX yang terasa modern dan menyenangkan dipakai (bukan seperti software HR "jadul")
- Arsitektur multi-tenant yang solid sejak awal, agar scalable tanpa refactor besar

### 3.3 Success Metrics (KPI)
| Metrik | Target 3 Bulan | Target 6 Bulan |
|---|---|---|
| Tenant aktif | 3–5 | 10–15 |
| Total karyawan terdaftar (across tenant) | 100 | 500 |
| Uptime | 99% | 99.5% |
| Churn rate | - | < 10%/bulan |
| Waktu onboarding tenant baru | < 15 menit (self-serve) | < 10 menit |

---

## 4. Target Pengguna & Persona

### 4.1 Target Market Utama
Niche awal: **studio kreatif, agency, startup, dan SME dengan 5–100 karyawan**, khususnya di sektor yang sudah jadi jaringan klien StackPlus (media publishing, e-commerce/D2C, edukasi, arsitektur/interior).

### 4.2 Persona

**Persona 1: Founder/Owner Studio Kecil ("Rangga")**
- Usia 28–40, memimpin studio/agency dengan 10–30 orang
- Pain point: masih pakai spreadsheet buat absensi & payroll, sering telat hitung gaji
- Butuh: dashboard simpel, approval cuti cepat, laporan payroll otomatis
- Tidak butuh: fitur kompleks seperti performance appraisal 360°

**Persona 2: HR/Admin Operasional ("Sari")**
- Usia 24–35, single-handedly mengurus HR + admin umum di perusahaan kecil
- Pain point: kerja manual berulang (rekap absensi, hitung lembur, buat slip gaji)
- Butuh: automasi tugas administratif, template surat, reminder otomatis

**Persona 3: Karyawan ("Budi")**
- Usia 22–35, pengguna aplikasi/portal karyawan
- Pain point: harus tanya HR manual buat cek sisa cuti/slip gaji
- Butuh: self-service portal — ajukan cuti, lihat slip gaji, cek absensi, dari HP

---

## 5. Analisis Kompetitor (Ringkas)

| Kompetitor | Kekuatan | Kelemahan | Peluang Diferensiasi |
|---|---|---|---|
| Gadjian | Payroll & compliance kuat | UI terasa kaku, sales-heavy | UX modern, self-serve |
| Talenta (Mekari) | Fitur lengkap, brand kuat | Mahal untuk tim kecil, kompleks | Harga terjangkau, simpel |
| LinovHR | Cocok enterprise | Kurang cocok tim kecil | Fokus SME/startup |
| Excel/Manual | Gratis, familiar | Error-prone, tidak scalable | Migrasi mudah dari spreadsheet |

**Posisi StackPlus HRIS:** "HRIS modern untuk tim kecil yang tumbuh cepat — setup dalam menit, bukan minggu."

---

## 6. Ruang Lingkup Produk

### 6.1 Prinsip Scoping (Solo Developer)
Karena dikerjakan satu orang fullstack, MVP **wajib** dibatasi ke modul inti yang benar-benar dipakai harian, bukan seluruh fitur HRIS sekaligus. Pendekatan: **vertical slice** — satu modul selesai end-to-end (backend, frontend, testing) sebelum lanjut ke modul berikutnya.

### 6.2 Fase Pengembangan

#### **FASE 1 — MVP Inti (Bulan 1–3)**
Modul yang WAJIB ada di versi pertama:
1. Multi-tenant Authentication & Onboarding
2. Manajemen Data Karyawan (Employee Directory)
3. Absensi (Attendance) — check-in/out, lokasi opsional
4. Manajemen Cuti & Izin (Leave Management)
5. Dashboard Admin dasar

#### **FASE 2 — Payroll & Self-Service (Bulan 4–5)**
6. Payroll dasar (perhitungan gaji, komponen gaji, slip gaji digital)
7. Employee Self-Service Portal (mobile-friendly web)
8. Laporan (reports) & export data

#### **FASE 3 — Ekspansi (Bulan 6+, tergantung traksi)**
9. Kepatuhan pajak (PPh 21) & BPJS otomatis
10. Performance Management (goal tracking sederhana)
11. Recruitment/ATS ringan
12. Integrasi (API, webhook, integrasi akuntansi)
13. Mobile app native (jika demand tinggi)

### 6.3 Eksplisit Out of Scope (Tidak Dikerjakan Dulu)
- Payroll multi-negara
- Modul finance/accounting penuh
- AI-based analytics kompleks
- White-labeling untuk reseller
- Integrasi sistem absensi biometrik hardware (fingerprint)

---

## 7. Functional Requirements

### 7.1 Modul: Authentication & Tenant Management
| ID | Requirement | Prioritas |
|---|---|---|
| AUTH-01 | User dapat mendaftar sebagai tenant baru (sign-up self-serve) dengan email & nama perusahaan | Must |
| AUTH-02 | Sistem multi-tenant dengan isolasi data penuh antar tenant | Must |
| AUTH-03 | Role-based access control: Super Admin (StackPlus), Company Admin, HR Staff, Manager, Employee | Must |
| AUTH-04 | Login via email/password, opsional Google OAuth | Must |
| AUTH-05 | Invite karyawan via email dengan link aktivasi akun | Must |
| AUTH-06 | Reset password via email | Must |
| AUTH-07 | Audit log aktivitas admin (siapa mengubah apa, kapan) | Should |
| AUTH-08 | 2FA (two-factor authentication) | Could |

### 7.2 Modul: Manajemen Data Karyawan
| ID | Requirement | Prioritas |
|---|---|---|
| EMP-01 | CRUD data karyawan (nama, jabatan, departemen, tanggal masuk, kontak, dll) | Must |
| EMP-02 | Struktur organisasi (departemen, jabatan, atasan langsung) | Must |
| EMP-03 | Upload dokumen karyawan (kontrak, KTP, NPWP) | Should |
| EMP-04 | Status karyawan (aktif, cuti panjang, resign, probation) | Must |
| EMP-05 | Riwayat perubahan data karyawan (histori jabatan, gaji) | Should |
| EMP-06 | Import karyawan massal via CSV/Excel | Should |
| EMP-07 | Employee directory dengan pencarian & filter | Must |

### 7.3 Modul: Absensi (Attendance)
| ID | Requirement | Prioritas |
|---|---|---|
| ATT-01 | Karyawan check-in/check-out via web portal | Must |
| ATT-02 | Rekap absensi harian/bulanan per karyawan | Must |
| ATT-03 | Deteksi keterlambatan otomatis berdasarkan jam kerja yang diset | Must |
| ATT-04 | Admin dapat koreksi manual data absensi dengan catatan alasan | Must |
| ATT-05 | Pengaturan jam kerja fleksibel per departemen/karyawan | Should |
| ATT-06 | Geolocation validation saat check-in (opsional per tenant) | Should |
| ATT-07 | Export laporan absensi (Excel/PDF) | Must |
| ATT-08 | Integrasi kalender hari libur nasional Indonesia | Should |

### 7.4 Modul: Cuti & Izin (Leave Management)
| ID | Requirement | Prioritas |
|---|---|---|
| LEV-01 | Karyawan mengajukan cuti/izin dengan jenis (cuti tahunan, sakit, izin, cuti melahirkan, dll) | Must |
| LEV-02 | Alur approval berjenjang (atasan langsung → HR) | Must |
| LEV-03 | Saldo cuti otomatis terupdate & terlihat oleh karyawan | Must |
| LEV-04 | Notifikasi email/in-app saat pengajuan/approval/penolakan | Must |
| LEV-05 | Konfigurasi kebijakan cuti per tenant (jumlah cuti tahunan, carry-over) | Must |
| LEV-06 | Kalender tim (siapa cuti kapan) | Should |
| LEV-07 | Lampiran dokumen (misal surat sakit) | Should |

### 7.5 Modul: Payroll (Fase 2)
| ID | Requirement | Prioritas |
|---|---|---|
| PAY-01 | Konfigurasi komponen gaji (gaji pokok, tunjangan, potongan) per karyawan | Must |
| PAY-02 | Perhitungan gaji otomatis berdasarkan absensi & cuti | Must |
| PAY-03 | Generate slip gaji digital (PDF) per periode | Must |
| PAY-04 | Perhitungan lembur otomatis | Should |
| PAY-05 | Perhitungan PPh 21 (Fase 3) | Could |
| PAY-06 | Perhitungan BPJS Kesehatan & Ketenagakerjaan (Fase 3) | Could |
| PAY-07 | Riwayat payroll & laporan payroll bulanan | Must |
| PAY-08 | Export data payroll untuk keperluan transfer bank (format umum) | Should |

### 7.6 Modul: Employee Self-Service Portal
| ID | Requirement | Prioritas |
|---|---|---|
| ESS-01 | Karyawan lihat profil & data pribadi sendiri | Must |
| ESS-02 | Karyawan lihat & unduh slip gaji | Must |
| ESS-03 | Karyawan ajukan cuti/izin dari portal | Must |
| ESS-04 | Karyawan lihat riwayat absensi sendiri | Must |
| ESS-05 | Karyawan update data pribadi (dengan approval jika field sensitif) | Should |
| ESS-06 | Notifikasi & pengumuman perusahaan | Could |

### 7.7 Modul: Dashboard & Reporting
| ID | Requirement | Prioritas |
|---|---|---|
| DSH-01 | Dashboard admin: ringkasan headcount, absensi hari ini, cuti pending | Must |
| DSH-02 | Grafik tren absensi & turnover | Should |
| DSH-03 | Custom report builder sederhana | Could |
| DSH-04 | Export semua laporan (Excel/PDF) | Must |

---

## 8. Non-Functional Requirements

| Kategori | Requirement |
|---|---|
| **Performance** | Waktu load halaman < 2 detik untuk 95% request; API response < 500ms |
| **Scalability** | Arsitektur multi-tenant mendukung minimal 500 tenant tanpa redesign |
| **Security** | Enkripsi data at-rest & in-transit (TLS); password hashing (bcrypt/argon2); isolasi data antar tenant di level query/database |
| **Compliance** | Kepatuhan dasar UU PDP (Perlindungan Data Pribadi) Indonesia |
| **Availability** | Target uptime 99.5% setelah stabil |
| **Backup** | Automated daily backup dengan retention minimal 30 hari |
| **Usability** | Onboarding self-serve tanpa perlu training/demo call |
| **Responsiveness** | Fully responsive — desktop, tablet, mobile (mobile-first untuk ESS portal) |
| **Localization** | Bahasa Indonesia sebagai default, dengan struktur i18n untuk ekspansi bahasa Inggris |
| **Auditability** | Semua perubahan data sensitif (gaji, cuti approval) tercatat di audit log |

---

## 9. Arsitektur Teknis (Rekomendasi)

> Catatan: karena dikerjakan solo, prioritaskan stack yang kamu paling familiar & produktif. Rekomendasi di bawah mengasumsikan stack modern JS/TS full-stack (menyesuaikan dengan stack yang biasa dipakai StackPlus untuk web development).

### 9.1 Arsitektur Multi-Tenant
**Pendekatan direkomendasikan: Shared Database, Shared Schema dengan `tenant_id`**
- Setiap tabel utama punya kolom `tenant_id`
- Row-level security / query middleware memastikan isolasi data
- Lebih murah & lebih mudah di-maintain solo dibanding database-per-tenant
- Bisa migrasi ke schema-per-tenant nanti jika ada klien enterprise yang minta isolasi lebih ketat

### 9.2 Stack Teknis yang Disarankan
| Layer | Rekomendasi |
|---|---|
| Frontend | Next.js (React) + TypeScript + Tailwind CSS |
| Backend | Next.js API routes / Node.js (NestJS atau Express) + TypeScript |
| Database | PostgreSQL (relasional, cocok untuk data terstruktur HR) |
| ORM | Prisma (schema-first, migration mudah untuk solo dev) |
| Auth | NextAuth.js / Clerk / Supabase Auth (hindari bikin auth dari nol) |
| File Storage | S3-compatible (AWS S3 / Cloudflare R2) untuk dokumen & slip gaji |
| Hosting | Vercel (frontend) + Railway/Render/Supabase (backend & DB) — minim DevOps overhead untuk solo dev |
| Email | Resend / SendGrid untuk notifikasi transaksional |
| PDF Generation | Puppeteer / React-PDF untuk slip gaji |
| Background Jobs | Trigger.dev / BullMQ untuk proses payroll terjadwal |
| Monitoring | Sentry (error tracking) + simple uptime monitor |

### 9.3 Pertimbangan Solo Developer
- **Pilih platform managed** (Vercel, Supabase, Railway) untuk minimalkan waktu DevOps
- **Gunakan library/service siap pakai** untuk auth, email, payment — jangan reinvent
- **Testing otomatis minimal**: unit test untuk logic kritikal (perhitungan payroll, cuti), karena tidak ada QA terpisah
- **CI/CD sederhana** dari awal (GitHub Actions) agar deploy tidak manual

---

## 10. Model Data (Ringkas — Entitas Utama)

```
Tenant (Company)
 ├── id, name, subdomain, plan, created_at

User
 ├── id, tenant_id, email, password_hash, role, status

Employee
 ├── id, tenant_id, user_id, full_name, department_id,
 │   position, join_date, employment_status, manager_id

Department
 ├── id, tenant_id, name, parent_department_id

Attendance
 ├── id, tenant_id, employee_id, date, check_in, check_out,
 │   status (present/late/absent), location (opsional)

LeaveRequest
 ├── id, tenant_id, employee_id, leave_type, start_date,
 │   end_date, status, approved_by, reason

LeaveBalance
 ├── id, tenant_id, employee_id, leave_type, balance, year

Payroll
 ├── id, tenant_id, employee_id, period, base_salary,
 │   allowances, deductions, net_salary, status

PayrollComponent
 ├── id, tenant_id, name, type (allowance/deduction), amount/formula

AuditLog
 ├── id, tenant_id, actor_id, action, entity, timestamp
```

---

## 11. Desain UI/UX & Design System

### 11.1 Referensi Visual
Berdasarkan brand StackPlus Studio (lihat screenshot referensi), design language yang dipakai untuk produk HRIS ini mengikuti prinsip yang sama:

**Karakter visual:**
- Bersih, minimalis, banyak white space (dalam hal ini "cream space")
- Tipografi bold & besar untuk heading, terasa modern dan percaya diri
- Aksen warna biru cerah sebagai warna utama CTA & highlight
- Komponen berbentuk pill/rounded (nav bar, tombol) — terasa friendly, bukan kaku ala software korporat lama
- Badge status kecil (misal "Available for new projects" → di HRIS bisa jadi "Live", "Pending Approval", dsb)

### 11.2 Design Tokens

**Warna:**
| Token | Kode (perkiraan dari referensi) | Penggunaan |
|---|---|---|
| Background primary | `#F5F1E8` (cream/off-white) | Background utama halaman |
| Text primary | `#1A1A1A` (hitam/near-black) | Heading & teks utama |
| Accent primary | `#2F5EFF` (biru cerah) | CTA button, link, highlight text |
| Accent dark | `#0A0A0A` | Tombol sekunder (pill hitam) |
| Surface / Card | `#FFFFFF` | Card, modal, form container |
| Border subtle | `#E5E0D5` | Divider, input border |
| Success | `#22C55E` | Status approved/aktif |
| Warning | `#F59E0B` | Status pending |
| Error | `#EF4444` | Status ditolak/error |

**Tipografi:**
- Font family: Sans-serif modern (mis. Inter, Geist, atau Satoshi — konsisten dengan gaya bold di landing page)
- Heading: Bold, ukuran besar (36–56px untuk H1), tight line-height
- Body: Regular, 14–16px, line-height nyaman dibaca (1.5)

**Komponen UI Kunci:**
- **Navigasi**: pill-shaped nav bar dengan active state background putih/kontras, mengambang di atas background cream
- **Tombol**: rounded-full, dua varian (primary biru, secondary hitam solid, atau outline)
- **Badge status**: pill kecil dengan dot indikator warna (mis. hijau untuk "Active", kuning untuk "Pending")
- **Card**: rounded corner besar (16–24px radius), shadow lembut, background putih di atas cream
- **Form input**: rounded, border tipis, focus state biru

### 11.3 Prinsip UX
1. **Self-serve first** — onboarding tanpa perlu bantuan sales/support
2. **Mobile-friendly untuk Employee Self-Service** — karyawan mostly akses dari HP
3. **Minim klik untuk tugas rutin** — check-in absensi & ajukan cuti maksimal 2 klik
4. **Feedback instan** — toast notification untuk setiap aksi (submit, approve, error)
5. **Empty state yang membantu** — bukan halaman kosong, tapi ada CTA/panduan

### 11.4 Halaman Utama yang Perlu Didesain (MVP)
1. Landing page (marketing) — sudah ada referensi dari stackplustudio.com
2. Sign up / onboarding wizard (buat tenant baru)
3. Login
4. Dashboard Admin
5. Employee Directory (list + detail + form tambah/edit)
6. Halaman Absensi (admin view + employee check-in view)
7. Halaman Cuti (pengajuan, approval, kalender tim)
8. Employee Self-Service portal (mobile-first)
9. Settings (tenant settings, kebijakan cuti, jam kerja)

---

## 12. Model Monetisasi (SaaS Pricing)

### 12.1 Struktur Tier (Usulan Awal)

| Tier | Target | Harga (usulan) | Fitur |
|---|---|---|---|
| **Starter** | Tim 1–10 orang | Rp 150.000–250.000/bulan (flat) atau per-karyawan kecil | Employee directory, absensi, cuti dasar |
| **Growth** | Tim 11–50 orang | Rp 15.000–25.000/karyawan/bulan | + Payroll, self-service portal, laporan |
| **Business** | Tim 51–100+ orang | Custom / Rp 20.000–35.000/karyawan/bulan | + Kepatuhan pajak, integrasi, priority support |

> Catatan: harga perlu divalidasi lewat riset harga kompetitor & survey calon pelanggan (bisa mulai dari jaringan klien StackPlus).

### 12.2 Model Trial
- Free trial 14 hari, tanpa kartu kredit, self-serve sign up
- Setelah trial, wajib upgrade untuk lanjut pakai (tidak ada free tier permanen di awal, untuk fokus revenue)

---

## 13. Rencana Rilis & Timeline (Estimasi Solo Developer)

| Fase | Durasi | Output |
|---|---|---|
| Sprint 0: Setup & Arsitektur | 1–2 minggu | Repo, CI/CD, auth multi-tenant, skema DB inti |
| Sprint 1: Employee Management | 2 minggu | CRUD karyawan, struktur organisasi |
| Sprint 2: Absensi | 2 minggu | Check-in/out, rekap, koreksi manual |
| Sprint 3: Cuti & Izin | 2 minggu | Pengajuan, approval flow, saldo cuti |
| Sprint 4: Dashboard & Polish MVP | 2 minggu | Dashboard admin, QA, bug fixing |
| **→ MVP Launch (internal/beta)** | ~10–12 minggu | Fase 1 selesai |
| Sprint 5–6: Payroll | 3–4 minggu | Perhitungan gaji, slip gaji PDF |
| Sprint 7: Self-Service Portal | 2 minggu | Portal karyawan mobile-friendly |
| **→ Public Launch** | ~Bulan 4–5 | Fase 2 selesai |

---

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Solo developer overload (fitur terlalu banyak) | Tinggi | Strict scoping MVP, tolak feature creep di Fase 1 |
| Perhitungan payroll salah (PPh 21, BPJS) | Tinggi (risiko finansial klien) | Tunda ke Fase 3, validasi dengan konsultan pajak/HR sebelum rilis, sediakan disclaimer |
| Kompetitor besar menurunkan harga | Sedang | Fokus niche (studio kreatif/startup) yang kurang dilayani kompetitor besar |
| Kesulitan akuisisi klien pertama | Tinggi | Manfaatkan jaringan klien StackPlus Studio yang sudah ada sebagai early adopter |
| Downtime/data loss | Tinggi | Automated backup, monitoring, pilih managed hosting yang reliable |
| Kepatuhan UU PDP | Sedang | Terapkan prinsip data minimization & enkripsi sejak awal desain |

---

## 15. Metrik Keberhasilan Produk (Post-Launch)

- **Activation rate**: % tenant baru yang menyelesaikan onboarding & menambahkan minimal 5 karyawan dalam 7 hari pertama
- **Weekly Active Usage**: % karyawan yang check-in absensi minimal 4x/minggu
- **Time to Value**: waktu dari sign up sampai tenant pertama kali generate laporan/payroll
- **NPS (Net Promoter Score)** dari admin tenant setelah 1 bulan pemakaian
- **Retention**: % tenant yang masih aktif setelah 3 bulan

---

## 16. Lampiran: Pertanyaan Terbuka untuk Divalidasi

1. Apakah nama produk "StackPlus HRIS" final, atau akan diberi brand terpisah (mis. bukan di bawah nama StackPlus langsung)?
2. Apakah target awal benar-benar dari jaringan klien StackPlus, atau cold market?
3. Berapa budget waktu realistis per minggu yang bisa dialokasikan (mengingat masih handle project klien StackPlus)?
4. Apakah perlu native mobile app di awal, atau web responsive cukup untuk MVP?
5. Model pricing: flat fee vs per-karyawan — mana yang lebih sesuai dengan target market (studio kecil biasanya lebih suka flat fee predictable)?

---

*Dokumen ini adalah living document — akan diperbarui seiring validasi asumsi dan feedback dari calon pengguna.*
