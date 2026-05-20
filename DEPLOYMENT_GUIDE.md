# 🚀 Deployment Guide - TripLedger Web

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Vercel account (gratis - sign up dengan GitHub)
- [ ] Firebase project sudah ada (dari iOS app)
- [ ] Git installed di komputer
- [ ] VSCode installed

---

## Step 1: Generate Web App Code dengan AI

### 1.1 Buka AI Tool (ChatGPT/Claude/Cursor)

Copy-paste file `PRD.md` ke AI tool kamu dengan prompt:

```
Buatkan saya semua code untuk Next.js web app berdasarkan PRD ini.
Generate semua file yang disebutkan di "Project Structure" section.
Gunakan App Router Next.js 14, TypeScript, dan Tailwind CSS.
Pastikan design match dengan design system yang sudah dijelaskan.
```

### 1.2 Copy Code ke VSCode

AI akan generate semua file. Copy satu per satu ke VSCode:

```
tripledger-web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── bill/[billId]/
│       ├── page.tsx
│       └── loading.tsx
├── components/
│   ├── BillHeader.tsx
│   ├── ProgressBar.tsx
│   ├── ParticipantList.tsx
│   ├── ParticipantCard.tsx
│   └── ReceiptImage.tsx
├── lib/
│   ├── firebase.ts
│   ├── fetchBill.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Step 2: Setup Firebase Config

### 2.1 Get Firebase Config

1. Buka https://console.firebase.google.com
2. Pilih project kamu
3. Sidebar kiri → Project Settings (gear icon)
4. Scroll ke bawah → "Your apps" section
5. Klik Web icon `</>`
6. Copy Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 2.2 Create `.env.local` File

Di root folder `tripledger-web/`, buat file baru `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

⚠️ **PENTING:** Jangan commit `.env.local` ke Git!

---

## Step 3: Test Locally

### 3.1 Install Dependencies

Buka terminal di folder `tripledger-web/`:

```bash
npm install
```

Wait sampai selesai (2-3 menit).

### 3.2 Run Development Server

```bash
npm run dev
```

### 3.3 Test di Browser

1. Buka http://localhost:3000
2. Buka http://localhost:3000/bill/[billId] (ganti [billId] dengan real billId dari Firestore)
3. Check apakah data tampil dengan benar

---

## Step 4: Update Firestore Rules

### 4.1 Open Firebase Console

1. Buka https://console.firebase.google.com
2. Pilih project kamu
3. Sidebar kiri → Firestore Database
4. Tab **"Rules"** (di atas)

### 4.2 Copy Rules

Buka file `FIRESTORE_RULES.txt`, copy semua isinya.

### 4.3 Paste & Publish

1. Delete semua rules yang ada di Firebase Console
2. Paste rules dari `FIRESTORE_RULES.txt`
3. Klik **"Publish"** (tombol biru di kanan atas)
4. Tunggu beberapa detik sampai status "Active"

### 4.4 Verify Rules Work

Test di browser: http://localhost:3000/bill/[billId]
- ✅ Kalau data tampil → Rules work!
- ❌ Kalau error "Permission denied" → Rules belum publish

---

## Step 5: Push to GitHub

### 5.1 Initialize Git

Di terminal (folder `tripledger-web/`):

```bash
git init
git add .
git commit -m "Initial commit - TripLedger Web"
```

### 5.2 Create GitHub Repository

1. Buka https://github.com/new
2. Repository name: `tripledger-web`
3. Privacy: **Private** (recommended) atau Public
4. **JANGAN** check "Initialize with README"
5. Klik **"Create repository"**

### 5.3 Push Code

Copy command dari GitHub (akan muncul setelah create repo):

```bash
git remote add origin https://github.com/YOUR_USERNAME/tripledger-web.git
git branch -M main
git push -u origin main
```

Refresh GitHub page → code sudah ada! ✅

---

## Step 6: Deploy to Vercel

### 6.1 Sign Up Vercel

1. Buka https://vercel.com/signup
2. Klik **"Continue with GitHub"**
3. Authorize Vercel

### 6.2 Import Project

1. Di Vercel Dashboard, klik **"Add New..."** → **"Project"**
2. List repository muncul → Cari `tripledger-web`
3. Klik **"Import"**

### 6.3 Configure Project

**Framework Preset:** Next.js (auto-detected) ✅

**Root Directory:** `./` (default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

### 6.4 Add Environment Variables

Klik **"Environment Variables"** section.

Add satu per satu (copy dari `.env.local`):

| Key                                          | Value                                   |
|----------------------------------------------|-----------------------------------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY`               | `AIza...`                               |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`           | `your-app.firebaseapp.com`              |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`            | `your-project-id`                       |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`        | `your-app.appspot.com`                  |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`   | `123456789`                             |
| `NEXT_PUBLIC_FIREBASE_APP_ID`                | `1:123456789:web:abc123`                |

### 6.5 Deploy!

Klik **"Deploy"** (tombol biru besar).

Tunggu 2-3 menit... ☕

### 6.6 Get Deployment URL

Setelah selesai, kamu dapat URL:

```
https://tripledger-web.vercel.app
```

atau

```
https://tripledger-web-xxxxxx.vercel.app
```

**🎉 CONGRATS! Web app live!**

---

## Step 7: Update iOS App

### 7.1 Copy Vercel URL

Dari Vercel Dashboard, copy URL deployment kamu.

### 7.2 Update iOS Code

Buka `TripLedger/Views/SplitBill/SplitBillDetailView.swift`

Find line:

```swift
let webURL = "https://tripledger.vercel.app/bill/\(billID)"
```

Ganti dengan URL Vercel kamu:

```swift
let webURL = "https://tripledger-web-xxxxxx.vercel.app/bill/\(billID)"
```

### 7.3 Build & Test iOS App

1. Build app di Xcode
2. Buka detail tagihan
3. Klik "Share ke WhatsApp"
4. Check link di WhatsApp
5. Buka link di browser → Should show bill detail! ✅

---

## Step 8: Testing Checklist

### iOS App
- [ ] Share button tampil di detail view
- [ ] Klik share → WhatsApp terbuka
- [ ] Message ter-format dengan benar
- [ ] Link format: `https://[your-domain].vercel.app/bill/[billId]`

### Web App
- [ ] Buka link di browser → page load
- [ ] Header section tampil (icon, title, owner, amount)
- [ ] Progress bar menunjukkan persentase
- [ ] Participant list tampil dengan status
- [ ] Expand participant → items tampil
- [ ] Tax/service per person dihitung benar
- [ ] Receipt image tampil (jika ada)
- [ ] Mobile responsive
- [ ] WhatsApp preview menampilkan meta tags

### Security
- [ ] Public bisa lihat bill (no login)
- [ ] Public tidak bisa list semua bills
- [ ] Public tidak bisa edit/delete

---

## 🎉 You're Done!

Sekarang:
- ✅ iOS app bisa share link via WhatsApp
- ✅ Web app menampilkan detail bill
- ✅ Design match dengan iOS
- ✅ Data secure & accessible

---

## 🔧 Troubleshooting

### ❌ "Bill not found" di web

**Problem:** billId tidak ditemukan di Firestore

**Solution:**
1. Check billId di URL
2. Buka Firebase Console → Firestore
3. Verify document dengan ID tersebut exist
4. Check Firestore rules sudah publish

---

### ❌ "Permission denied" error

**Problem:** Firestore rules belum di-update atau belum publish

**Solution:**
1. Buka Firebase Console → Firestore → Rules
2. Verify rules sudah sesuai dengan `FIRESTORE_RULES.txt`
3. Klik "Publish" lagi
4. Wait 30 seconds, refresh web page

---

### ❌ Vercel build failed

**Problem:** Missing dependencies atau build error

**Solution:**
1. Check Vercel logs (ada di deployment page)
2. Run `npm run build` di local untuk test
3. Fix errors yang muncul
4. Push changes ke GitHub
5. Vercel auto-deploy lagi

---

### ❌ Environment variables tidak work

**Problem:** Variables tidak ter-load atau salah nama

**Solution:**
1. Check semua variable pakai prefix `NEXT_PUBLIC_`
2. Verify typo di variable name
3. Di Vercel Dashboard → Project Settings → Environment Variables
4. Re-add variables yang salah
5. Redeploy: Deployments tab → `...` menu → "Redeploy"

---

### ❌ WhatsApp preview tidak tampil gambar/text

**Problem:** Meta tags tidak ter-generate

**Solution:**
1. Check `generateMetadata` function di `app/bill/[billId]/page.tsx`
2. Open Graph tags harus ada
3. WhatsApp cache preview: Share ke "Saved Messages" dulu, delete, share lagi

---

## 🆘 Need Help?

**Firebase Issues:**
- Docs: https://firebase.google.com/docs/firestore

**Next.js Issues:**
- Docs: https://nextjs.org/docs

**Vercel Issues:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**General Issues:**
- Check logs di Vercel Dashboard
- Check browser console (F12) untuk errors
- Check Firebase Console Firestore rules

---

## 🚀 What's Next? (Optional Improvements)

### Custom Domain
Kalau mau domain sendiri (e.g., `tripledger.app`):
1. Beli domain di Namecheap/GoDaddy (~$10/year)
2. Vercel Dashboard → Project Settings → Domains
3. Add custom domain
4. Update DNS records (Vercel kasih instruksi)
5. Wait 24-48 hours

### Analytics
Track page views:
1. Vercel Dashboard → Project Settings → Analytics
2. Enable "Vercel Analytics"
3. Free tier: 100k requests/month

### Error Monitoring
Setup Sentry for error tracking:
1. Create Sentry account (free)
2. Install `@sentry/nextjs`
3. Add Sentry config
4. Get notified when errors happen

---

## ✅ Final Checklist

- [ ] Web app deployed to Vercel
- [ ] iOS app updated dengan Vercel URL
- [ ] Firestore rules published
- [ ] Test share dari iOS ke WhatsApp
- [ ] Test open link di browser
- [ ] Verify data tampil dengan benar
- [ ] Test di mobile device
- [ ] All participants expand correctly
- [ ] Tax calculation correct

**ALL DONE! 🎉**
