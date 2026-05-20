# TripLedger Web

Web application untuk melihat detail split bill yang dishare dari TripLedger iOS app.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore
- **Deployment:** Vercel

## Project Structure

```
tripledger-web/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   └── bill/
│       └── [billId]/
│           ├── page.tsx           # Bill detail page
│           └── loading.tsx        # Loading skeleton
├── components/
│   ├── BillHeader.tsx
│   ├── ProgressBar.tsx
│   ├── ParticipantList.tsx
│   ├── ParticipantCard.tsx
│   └── ReceiptImage.tsx
├── lib/
│   ├── types.ts                   # TypeScript types
│   ├── firebase.ts                # Firebase initialization
│   ├── fetchBill.ts               # Fetch bill function
│   └── utils.ts                   # Utility functions
├── styles/
│   └── globals.css                # Global styles + Tailwind
└── public/
    └── favicon.ico
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda (atau buat baru)
3. Pergi ke **Project Settings** > **General** > **Your apps**
4. Copy Firebase configuration

### 3. Setup Environment Variables

1. Copy file `.env.local.example` menjadi `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Isi environment variables dengan Firebase config Anda:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 4. Setup Firestore Rules

Buka Firebase Console > Firestore Database > Rules, lalu copy-paste rules berikut:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Split Bills Collection
    match /splitBills/{billId} {
      // Allow public READ for individual bills (siapa saja yang punya link)
      allow read: if true;

      // Only authenticated users (iOS app) can create/update/delete
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
                      (request.auth.uid == resource.data.ownerUID ||
                       request.auth.uid in resource.data.participantUIDs);
      allow delete: if request.auth != null &&
                      request.auth.uid == resource.data.ownerUID;
    }

    // Deny all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push code ke GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tripledger-web.git
git push -u origin main
```

2. Buka [Vercel Dashboard](https://vercel.com)
3. Login dengan GitHub
4. Click **"New Project"**
5. Select repository: `tripledger-web`
6. Framework: **Next.js** (auto-detected)
7. Add Environment Variables (copy dari `.env.local`)
8. Click **"Deploy"**
9. Tunggu 2-3 menit
10. Get deployment URL: `https://tripledger.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Update iOS App URL

Setelah deploy, update URL di iOS app (`SplitBillDetailView.swift`):

```swift
let webURL = "https://your-project-name.vercel.app/bill/\(billID)"
```

## Features

- View split bill details from iOS app share link
- Responsive mobile-first design
- Real-time data from Firebase Firestore
- Progress bar showing payment status
- Expandable participant details with item breakdown
- Tax and service charge calculation per participant
- Receipt image preview
- Loading skeleton
- Error handling
- SEO optimized with meta tags for WhatsApp sharing

## Design System

Matches iOS app design system:
- **Colors:** Purple brand colors (#433075, #A58CF4)
- **Typography:** SF Pro Rounded / ui-rounded
- **Spacing:** Consistent 4px grid
- **Border Radius:** Rounded corners (10-28px)
- **Shadows:** Soft purple shadows

## Security

- Public read-only access for bill details (no auth required)
- Cannot list all bills (only access via direct link)
- No edit/delete functionality on web
- Firestore rules protect writes to authenticated iOS app only

## License

© 2024 TripLedger. All rights reserved.
