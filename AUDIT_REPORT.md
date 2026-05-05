# Audit & Fix Report — SmartFinanceAI Frontend

Audit ini memperbaiki 20 area yang sebelumnya janggal agar frontend lebih siap sebagai MVP capstone dan plug-and-play ke backend Express.

## Perbaikan utama

1. `toApiProfilePayload` dibuat partial-safe agar update onboarding/profil tidak menghapus `name` atau `email`.
2. `ProtectedRoute` diubah menjadi async guard yang mengecek session, status user, dan `onboarding_completed`.
3. Login sekarang mengarahkan user ke `/onboarding` jika profil belum lengkap.
4. Register diperkuat dengan validasi email, password minimal 8 karakter, huruf + angka, dan confirm password.
5. OTP diperbaiki dengan validasi 6 digit, cooldown resend, pesan error yang lebih jelas, dan batas percobaan di local mode.
6. Onboarding dipindah ke `src/features/onboarding/pages/Onboarding.jsx` dan tetap disediakan re-export lama untuk kompatibilitas.
7. Onboarding ditambah `saving_target` agar dashboard `Target Tabungan` punya sumber data yang valid.
8. Transaksi sekarang mendukung create, read, update, delete, search, filter, dan confirm delete.
9. Kategori tidak lagi hanya hardcoded di page transaksi; sudah ada `categoryApi` dan `categoryRepository`.
10. Dashboard punya empty state untuk user baru.
11. Tombol export dashboard dibuat nyata dengan download CSV.
12. Analytics lokal ditingkatkan: agregasi bulanan, expense ratio, saving rate, rekomendasi berbasis profil.
13. Recommendation page punya loading, empty, error state, prioritas, dan tombol dummy diubah menjadi disabled "Segera hadir".
14. Profile sekarang menampilkan dan mengedit data onboarding: nickname, age range, spending style, financial goal, priority, risk profile.
15. Bahasa UI dibuat lebih konsisten ke bahasa Indonesia.
16. Mock user diganti menjadi `Demo User` agar tidak terlihat seperti data personal asli.
17. API response handling distandarkan lewat `unwrapApiResponse`.
18. Axios interceptor sekarang membersihkan token dan mengirim event session expired saat 401.
19. CSS transaksi/rekomendasi/profil/dashboard ditambah untuk state baru dan layout responsif.
20. Tooling ditambah: ESLint, Prettier, `lint` script, dan `format` script.

## Hasil validasi

```bash
npm run lint
npm run build
```

Keduanya berhasil. Build masih menampilkan warning chunk besar dari Vite karena `recharts`/icon library; itu bukan error.

## Endpoint backend yang perlu disiapkan

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/verify-otp`
- `POST /api/auth/resend-otp`
- `GET /api/auth/me`
- `PUT /api/auth/me`
- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`
- `GET /api/categories`
- `POST /api/categories`
- `GET /api/recommendations`
- `GET /api/analytics/summary`

## Mode integrasi

Local development:

```env
VITE_DATA_SOURCE=local
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend Express:

```env
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=http://localhost:5000/api
```
