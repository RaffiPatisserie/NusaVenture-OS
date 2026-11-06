# Software Requirements Specification (SRS) & RBAC Matrix — NusaVenture OS v6.0

## 1. Kebutuhan Fungsional Utama (Functional Requirements)
- **FR-01 (Google OAuth 2.0 SSO):** Sistem menyediakan autentikasi berbasis token Google OAuth 2.0 pada tombol header kanan atas untuk peran `MITRA`, `INVESTOR`, dan `ADMIN`, serta menghimpun log waktu login ke backend.
- **FR-02 (Isolasi Hierarki Portal):** Keempat portal (`1-public-portal.html`, `2-partner-umkm.html`, `3-investor-bit.html`, `4-admin-command.html`) berjalan pada link/subdomain mandiri tanpa menu navigasi silang antar-portal.
- **FR-03 (Formulir KYB Standar Perbankan):** Portal Publik menyediakan pendaftaran 4 bagian lengkap (KYC NIK 16 digit, Legalitas NIB/NPWP, Rekening Bank & SLIK OJK, serta Rencana Tranche & Kredensial).
- **FR-04 (Gated LMS NusaAcademy):** Portal Mitra mengunci formulir pengajuan modal kerja Dual-Approval Escrow hingga mitra menyelesaikan 100% (3 modul) pelatihan dasar adaptasi pasar dan kuis sertifikasi.
- **FR-05 (Manajemen Inventaris B2B Sirkular):** Mitra dapat memesan SKU bahan baku, kemasan QR, bio-energi, dan sewa mesin idle menggunakan saldo Internal B2B Credit dengan pemotongan HPP 15%–30%.
- **FR-06 (Engine Audit Mass-Balance 3.0%):** Sistem menghitung selisih `Input - (POS + Stok Gudang + Reject)` secara otomatis; deviasi di atas 3.0% langsung membekukan Tranche dan menjadwalkan audit lapangan via NusaAI.
- **FR-07 (Mode Siang & Malam Adaptif):** Seluruh komponen Black-Box UI mendukung pergantian tema Siang (Warm Alabaster) dan Malam (Deep Obsidian Olive) secara real-time.

## 2. Matriks Role-Based Access Control (RBAC)
| Modul / Endpoint Sistem | PUBLIC | MITRA (UMKM) | INVESTOR | ADMIN (Command) |
| :--- | :---: | :---: | :---: | :---: |
| Katalog Publik & Kalkulator 1.6x Cap | R | R | R | R / W |
| Pendaftaran Berkas KYB Perbankan | W | - | - | R / Approve |
| Modul Pelatihan NusaAcademy (LMS) | - | R / W | R (Badge) | R (Monitor) |
| Pemesanan SKU Inventaris B2B | - | R / W | - | R / W |
| Rekonsiliasi POS & Stok Mass-Balance | - | R / W | R | R / Reconcile |
| Pengajuan Pencairan Escrow ke Supplier | - | W (Jika Lulus LMS) | - | R / Approve |
| Pembelian Lot Tranche Emiten UMKM | - | - | R / W | R |
| Restock Master Inventaris B2B (`/api/inventory/restock`) | - | W (Pemasok) | - | R / W |
| Database Akun Google OAuth & Log Sesi | - | - | - | R / Audit |