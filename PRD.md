# TripLedger Web - Product Requirements Document (PRD)

## 📋 Overview

**Project Name:** TripLedger Web
**Purpose:** Web application untuk melihat detail split bill yang dishare dari iOS app
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Firebase SDK
**Deployment:** Vercel
**URL Format:** `https://tripledger.vercel.app/bill/[billId]`

---

## 🎯 Requirements

### Functional Requirements
1. **Single Page:** Detail tagihan patungan (split bill)
2. **Dynamic Route:** `/bill/[billId]` - billId dari URL parameter
3. **Data Fetching:** Real-time fetch dari Firestore berdasarkan billId
4. **Read-Only:** Tidak ada edit/delete functionality
5. **Responsive:** Mobile-first design
6. **Loading State:** Show skeleton/spinner saat loading
7. **Error Handling:** Handle bill not found, network error

### Non-Functional Requirements
1. **Performance:** Fast page load (< 2s)
2. **SEO:** Meta tags untuk sharing
3. **Security:** Public read only dengan billId
4. **Accessibility:** Semantic HTML, proper contrast

---

## 🎨 Design System (Match iOS App)

### Color Palette

```css
/* Brand Colors */
--brand-primary: #433075;      /* Deep Purple */
--brand-accent: #A58CF4;       /* Lavender */
--brand-danger: #E5484D;

/* Surfaces */
--surface-base: #FAFAFA;       /* Soft White - background */
--surface-card: #FFFFFF;       /* White - cards */
--surface-elevated: #F4F1FF;   /* Light Purple */

/* Text */
--text-primary: #0D0D0D;       /* Jet Black */
--text-secondary: rgba(13, 13, 13, 0.65);
--text-tertiary: rgba(13, 13, 13, 0.35);

/* Semantic Colors */
--success-green: #22C55E;
--warning-amber: #F59E0B;
--error-red: #E5484D;

/* Borders */
--border-soft: #E9E2FF;
--border-strong: #CFC2FF;

/* Shadows */
--shadow-soft: rgba(67, 48, 117, 0.08);
--shadow-medium: rgba(67, 48, 117, 0.14);
```

### Typography

**Font Family:** System UI Rounded (`ui-rounded`, `SF Pro Rounded`)

```css
/* Font Sizes (matching iOS AppFont) */
--font-largeTitle: 34px;     /* weight: bold */
--font-title1: 28px;         /* weight: bold */
--font-title2: 22px;         /* weight: semibold */
--font-title3: 20px;         /* weight: semibold */
--font-headline: 17px;       /* weight: semibold */
--font-body: 17px;           /* weight: regular */
--font-callout: 16px;        /* weight: regular */
--font-subheadline: 15px;    /* weight: medium */
--font-footnote: 13px;       /* weight: regular */
--font-caption: 12px;        /* weight: regular */
--font-caption2: 11px;       /* weight: medium */
```

### Spacing

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-xxl: 48px;
```

### Border Radius

```css
--radius-xs: 6px;
--radius-sm: 10px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-xl: 28px;
--radius-full: 9999px;
```

### Shadows

```css
/* Card Shadow */
box-shadow: 0 6px 12px rgba(67, 48, 117, 0.08);

/* Elevated Shadow */
box-shadow: 0 8px 16px rgba(67, 48, 117, 0.14);
```

### Gradients

```css
/* Brand Gradient */
background: linear-gradient(135deg, #433075 0%, #A58CF4 100%);

/* Card Gradient */
background: linear-gradient(180deg, #FFFFFF 0%, #F4F1FF 100%);
```

---

## 📱 Page Structure

### Route: `/bill/[billId]`

**Page Layout:**

```
┌─────────────────────────────────────┐
│          Header Icon (Scissors)      │
│           Bill Title                 │
│         "dibuat oleh [Owner]"        │
│         Total Amount (Large)         │
├─────────────────────────────────────┤
│        Progress Bar Section          │
│    "Terkumpul: Rp X / Rp Y"         │
│    ████████░░░░░░ (progress bar)    │
├─────────────────────────────────────┤
│       "Daftar Patungan"             │
│                                      │
│  ┌───────────────────────────────┐ │
│  │ [A] Andi         Rp 50.000    │ │
│  │     ✓ Lunas                   │ │
│  │     ▼ [Expandable]            │ │
│  │                                │ │
│  │  Rincian Pembayaran:          │ │
│  │  • Nasi Goreng - Rp 30.000... │ │
│  │  • Pajak - Rp 3.000           │ │
│  │  Total Bayar: Rp 50.000       │ │
│  └───────────────────────────────┘ │
│                                      │
│  ┌───────────────────────────────┐ │
│  │ [B] Budi         Rp 40.000    │ │
│  │     ⚠ Belum                   │ │
│  │     ▼                          │ │
│  └───────────────────────────────┘ │
├─────────────────────────────────────┤
│         Receipt Image (optional)     │
│         [Image preview]              │
└─────────────────────────────────────┘
```

---

## 🧩 Components Specification

### 1. **BillDetailPage** (Main Page Component)

**File:** `app/bill/[billId]/page.tsx`

**Props:** `{ params: { billId: string } }`

**State:**
- `bill: SplitBillModel | null`
- `loading: boolean`
- `error: string | null`

**Functionality:**
- Fetch bill data dari Firestore on mount
- Handle loading, error, success states
- Render BillHeader, ProgressBar, ParticipantList components

---

### 2. **BillHeader** Component

**Display:**
```tsx
<div className="text-center space-y-3 pt-6">
  {/* Icon */}
  <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-primary/10 flex items-center justify-center">
    <ScissorsIcon className="w-7 h-7 text-brand-primary" />
  </div>

  {/* Title */}
  <div className="space-y-1">
    <h1 className="text-2xl font-bold text-text-primary">{bill.title}</h1>
    <p className="text-sm text-text-secondary">dibuat oleh {bill.ownerName}</p>
  </div>

  {/* Total Amount */}
  <p className="text-4xl font-bold text-brand-primary">
    {formatCurrency(bill.totalAmount, bill.currency)}
  </p>
</div>
```

**Styling:**
- Background: `surface-base`
- Title: `font-title3`, `text-primary`
- Owner: `font-subheadline`, `text-secondary`
- Amount: `font-title1`, `brand-primary`

---

### 3. **ProgressBar** Component

**Props:**
```tsx
{
  paidAmount: number;
  totalAmount: number;
  currency: string;
}
```

**Display:**
```tsx
<div className="space-y-2 px-5">
  {/* Label */}
  <div className="flex justify-between items-center">
    <span className="text-sm text-text-secondary">Terkumpul</span>
    <span className="text-base font-semibold text-text-primary">
      {formatCurrency(paidAmount, currency)} / {formatCurrency(totalAmount, currency)}
    </span>
  </div>

  {/* Progress Bar */}
  <div className="w-full h-2 bg-text-primary/10 rounded-full overflow-hidden">
    <div
      className="h-full bg-brand-primary transition-all duration-300"
      style={{ width: `${(paidAmount / totalAmount) * 100}%` }}
    />
  </div>
</div>
```

**Logic:**
- Calculate percentage: `(paidAmount / totalAmount) * 100`
- If 100%, use `success-green` color instead of `brand-primary`

---

### 4. **ParticipantList** Component

**Props:**
```tsx
{
  participants: Participant[];
  bill: SplitBillModel;
}
```

**Display:**
```tsx
<div className="space-y-3 px-5">
  {/* Header */}
  <h2 className="text-lg font-semibold text-text-primary">Daftar Patungan</h2>

  {/* List */}
  <div className="space-y-2">
    {participants.map(p => (
      <ParticipantCard key={p.id} participant={p} bill={bill} />
    ))}
  </div>
</div>
```

---

### 5. **ParticipantCard** Component (Expandable)

**Props:**
```tsx
{
  participant: Participant;
  bill: SplitBillModel;
}
```

**State:**
- `isExpanded: boolean` (default: false)

**Display (Collapsed):**
```tsx
<div className="bg-surface-card rounded-2xl p-3 shadow-sm border border-border-soft">
  <div className="flex items-center gap-3">
    {/* Avatar */}
    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
      <span className="text-lg font-semibold text-brand-accent">
        {participant.displayName.charAt(0).toUpperCase()}
      </span>
    </div>

    {/* Name & Amount */}
    <div className="flex-1">
      <p className="text-sm font-medium text-text-primary">{participant.displayName}</p>
      <p className="text-xs text-text-secondary">
        {formatCurrency(participant.amount, bill.currency)}
      </p>
    </div>

    {/* Status Badge */}
    {participant.isPaid ? (
      <div className="flex items-center gap-1 px-3 py-1 bg-success-green/10 rounded-full">
        <CheckCircleIcon className="w-4 h-4 text-success-green" />
        <span className="text-xs text-success-green font-medium">Lunas</span>
      </div>
    ) : (
      <div className="flex items-center gap-1 px-3 py-1 bg-warning-amber/10 rounded-full">
        <span className="text-xs text-warning-amber font-medium">Belum</span>
      </div>
    )}

    {/* Expand Button */}
    <button onClick={() => setIsExpanded(!isExpanded)}>
      <ChevronDownIcon className={`w-5 h-5 text-text-tertiary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
    </button>
  </div>

  {/* Expanded Content */}
  {isExpanded && (
    <div className="mt-3 pt-3 border-t border-border-soft space-y-2">
      <p className="text-xs font-medium text-text-secondary">Rincian Pembayaran</p>

      {/* Items */}
      {extractItems(participant, bill.notes).map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="w-1 h-1 rounded-full bg-text-tertiary mt-1.5" />
          <p className="text-xs text-text-secondary flex-1">{item}</p>
        </div>
      ))}

      {/* Tax & Service */}
      {(taxShare > 0 || serviceShare > 0) && (
        <>
          <div className="my-2 border-t border-border-soft" />
          <p className="text-xs font-medium text-text-tertiary">Biaya Tambahan:</p>

          {taxShare > 0 && (
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-warning-amber/60 mt-1.5" />
              <p className="text-xs text-text-secondary">
                Pajak/PPN - {formatCurrency(taxShare, bill.currency)}
              </p>
            </div>
          )}

          {serviceShare > 0 && (
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-warning-amber/60 mt-1.5" />
              <p className="text-xs text-text-secondary">
                Service Charge - {formatCurrency(serviceShare, bill.currency)}
              </p>
            </div>
          )}

          {/* Total */}
          <div className="mt-2 pt-2 border-t border-border-soft flex justify-between">
            <p className="text-xs font-semibold text-text-primary">Total Bayar:</p>
            <p className="text-xs font-semibold text-brand-primary">
              {formatCurrency(participant.amount, bill.currency)}
            </p>
          </div>
        </>
      )}
    </div>
  )}
</div>
```

**Logic:**
- Parse items from `bill.notes` field
- Extract participant's items using pattern: `• Item: Participant1, Participant2`
- Calculate tax share proportionally

---

### 6. **ReceiptImage** Component (Optional)

**Props:**
```tsx
{
  receiptURL?: string;
}
```

**Display:**
```tsx
{receiptURL && (
  <div className="px-5 space-y-3">
    <h3 className="text-lg font-semibold text-text-primary">Foto Struk</h3>
    <img
      src={receiptURL}
      alt="Receipt"
      className="w-full h-48 object-cover rounded-2xl border border-border-soft"
    />
  </div>
)}
```

---

## 🔥 Firebase Integration

### Firestore Data Model

**Collection:** `splitBills`

**Document Structure:**
```typescript
interface SplitBillModel {
  id: string;
  ownerUID: string;
  ownerName: string;
  title: string;
  totalAmount: number;
  currency: string;
  participants: Participant[];
  participantUIDs: string[];
  source: 'manual' | 'scan';
  receiptURL?: string;
  status: 'active' | 'settled';
  category?: string;
  notes?: string;
  createdAt: Timestamp;
}

interface Participant {
  id: string;
  uid?: string;
  displayName: string;
  amount: number;
  isPaid: boolean;
}
```

### Firebase Setup

**File:** `lib/firebase.ts`

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Fetch Bill Function

**File:** `lib/fetchBill.ts`

```typescript
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function fetchBill(billId: string) {
  try {
    const billRef = doc(db, 'splitBills', billId);
    const billSnap = await getDoc(billRef);

    if (!billSnap.exists()) {
      return { error: 'Tagihan tidak ditemukan' };
    }

    return { data: { id: billSnap.id, ...billSnap.data() } };
  } catch (error) {
    console.error('Error fetching bill:', error);
    return { error: 'Gagal memuat tagihan' };
  }
}
```

---

## 🔒 Firestore Security Rules

**File:** `firestore.rules` (di Firebase Console)

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

**Security Explanation:**
- ✅ **Public Read:** Siapa saja bisa baca detail 1 bill (kalau tahu billID)
- ❌ **No List Access:** Tidak bisa list semua bills
- ✅ **Auth Only Write:** Hanya iOS app (authenticated) yang bisa create/update/delete
- ✅ **Owner Control:** Hanya owner yang bisa delete bill
- ✅ **Participant Update:** Owner atau participant bisa update (untuk mark as paid)

---

## 🛠️ Utility Functions

### 1. **formatCurrency**

```typescript
export function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${currency} ${formatter.format(amount)}`;
}
```

**Example Output:**
- `formatCurrency(50000, "Rp")` → `"Rp 50.000"`
- `formatCurrency(131000, "Rp")` → `"Rp 131.000"`

---

### 2. **extractParticipantItems**

```typescript
export function extractParticipantItems(
  notes: string | undefined,
  participantName: string
): string[] {
  if (!notes) return [];

  const lines = notes.split('\n');
  const items: string[] = [];

  for (const line of lines) {
    // Pattern: "• 2x Nasi Goreng (Rp 25000 @ Rp 50000): Andi, Budi"
    if (line.includes('•') && line.includes(':') &&
        !line.includes('Pajak') && !line.includes('Service')) {
      const [itemPart, participantsPart] = line.split(':');

      if (participantsPart?.includes(participantName)) {
        const itemName = extractItemName(itemPart);
        const totalPrice = extractTotalPrice(itemPart);
        const participantNames = participantsPart.split(',').map(s => s.trim());
        const sharePrice = totalPrice / participantNames.length;

        const shareText = participantNames.length > 1
          ? ` (bayar Rp ${formatAmount(sharePrice)})`
          : '';

        items.push(`${itemName} - Rp ${formatAmount(totalPrice)}${shareText}`);
      }
    }
  }

  return items;
}
```

---

### 3. **extractTaxAndServiceCharges**

```typescript
export function extractTaxAndServiceCharges(notes: string | undefined): {
  tax: number;
  service: number;
} {
  if (!notes) return { tax: 0, service: 0 };

  let tax = 0;
  let service = 0;

  const lines = notes.split('\n');
  for (const line of lines) {
    if (line.includes('Pajak') || line.includes('PPN')) {
      tax = extractNumber(line);
    } else if (line.includes('Service')) {
      service = extractNumber(line);
    }
  }

  return { tax, service };
}
```

---

### 4. **calculateTaxShare**

```typescript
export function calculateTaxShare(
  participant: Participant,
  totalTax: number,
  totalService: number,
  billTotalAmount: number
): { tax: number; service: number } {
  const participantItemAmount = participant.amount -
    (totalTax + totalService) * (participant.amount / billTotalAmount);
  const totalItemsAmount = billTotalAmount - totalTax - totalService;

  if (totalItemsAmount > 0) {
    const proportion = participantItemAmount / totalItemsAmount;
    return {
      tax: totalTax * proportion,
      service: totalService * proportion
    };
  }

  return { tax: 0, service: 0 };
}
```

---

## 📦 Project Structure

```
tripledger-web/
├── app/
│   ├── layout.tsx                 # Root layout with fonts & styles
│   ├── page.tsx                   # Homepage (optional - bisa redirect)
│   └── bill/
│       └── [billId]/
│           ├── page.tsx           # Main bill detail page
│           └── loading.tsx        # Loading skeleton
├── components/
│   ├── BillHeader.tsx
│   ├── ProgressBar.tsx
│   ├── ParticipantList.tsx
│   ├── ParticipantCard.tsx
│   └── ReceiptImage.tsx
├── lib/
│   ├── firebase.ts                # Firebase initialization
│   ├── fetchBill.ts               # Firestore fetch function
│   └── utils.ts                   # Utility functions
├── styles/
│   └── globals.css                # Tailwind + custom CSS variables
├── public/
│   └── favicon.ico
├── .env.local                     # Firebase config (NOT committed)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Tailwind Configuration

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#433075',
        'brand-accent': '#A58CF4',
        'brand-danger': '#E5484D',
        'surface-base': '#FAFAFA',
        'surface-card': '#FFFFFF',
        'surface-elevated': '#F4F1FF',
        'text-primary': '#0D0D0D',
        'text-secondary': 'rgba(13, 13, 13, 0.65)',
        'text-tertiary': 'rgba(13, 13, 13, 0.35)',
        'success-green': '#22C55E',
        'warning-amber': '#F59E0B',
        'error-red': '#E5484D',
        'border-soft': '#E9E2FF',
        'border-strong': '#CFC2FF',
      },
      fontFamily: {
        sans: ['ui-rounded', 'SF Pro Rounded', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'large-title': '34px',
        'title-1': '28px',
        'title-2': '22px',
        'title-3': '20px',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      boxShadow: {
        'soft': '0 6px 12px rgba(67, 48, 117, 0.08)',
        'medium': '0 8px 16px rgba(67, 48, 117, 0.14)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 📱 Meta Tags & SEO

**File:** `app/bill/[billId]/page.tsx`

```typescript
export async function generateMetadata({ params }: { params: { billId: string } }) {
  const { data: bill } = await fetchBill(params.billId);

  if (!bill) {
    return {
      title: 'Tagihan Tidak Ditemukan - TripLedger',
    };
  }

  return {
    title: `${bill.title} - TripLedger`,
    description: `Detail tagihan patungan: ${bill.title}. Total: ${formatCurrency(bill.totalAmount, bill.currency)}. Peserta: ${bill.participants.length} orang.`,
    openGraph: {
      title: bill.title,
      description: `Total: ${formatCurrency(bill.totalAmount, bill.currency)}`,
      type: 'website',
    },
  };
}
```

---

## 🚀 Deployment to Vercel

### Step 1: Setup Firebase Config

1. Buka Firebase Console → Project Settings
2. Copy Firebase config (apiKey, authDomain, dll)
3. Create file `.env.local` di root project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tripledger-web.git
git push -u origin main
```

### Step 3: Deploy to Vercel (via GUI)

1. Buka https://vercel.com
2. Login with GitHub
3. Click **"New Project"**
4. Select repository: `tripledger-web`
5. Framework Preset: **Next.js** (auto-detected)
6. Add Environment Variables (copy dari `.env.local`):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
7. Click **"Deploy"**
8. Wait 2-3 minutes
9. Get deployment URL: `https://tripledger.vercel.app`

### Step 4: Update iOS App URL

Ganti URL di `SplitBillDetailView.swift`:

```swift
// Before
let webURL = "https://tripledger.vercel.app/bill/\(billID)"

// After (ganti dengan URL Vercel kamu)
let webURL = "https://your-project-name.vercel.app/bill/\(billID)"
```

### Step 5: Update Firestore Rules

1. Buka Firebase Console → Firestore Database → Rules
2. Copy-paste rules dari section "Firestore Security Rules" di atas
3. Click **"Publish"**

---

## ✅ Testing Checklist

### iOS App Testing
- [ ] Share button tampil di detail tagihan
- [ ] Click share button membuka WhatsApp
- [ ] Message ter-format dengan benar (title, amount, link)
- [ ] Link format: `https://[domain].vercel.app/bill/[billId]`

### Web App Testing
- [ ] Buka link di browser → page load dengan data bill
- [ ] Header section tampil dengan benar (icon, title, owner, amount)
- [ ] Progress bar menunjukkan persentase yang benar
- [ ] Participant list tampil dengan status (Lunas/Belum)
- [ ] Expand participant → rincian item tampil
- [ ] Tax/service charge per person dihitung dengan benar
- [ ] Receipt image tampil (jika ada)
- [ ] Mobile responsive (test di iPhone, Android)
- [ ] Loading state tampil saat fetch data
- [ ] Error handling untuk bill not found
- [ ] Meta tags tampil untuk WhatsApp preview

### Security Testing
- [ ] Public user bisa baca bill detail (no auth required)
- [ ] Public user TIDAK bisa list semua bills
- [ ] Public user TIDAK bisa edit/delete bill
- [ ] Firestore rules block unauthorized writes

---

## 🎯 Success Criteria

1. ✅ User bisa share link dari iOS app via WhatsApp
2. ✅ Link dibuka di browser menampilkan detail bill yang sama dengan iOS
3. ✅ Design web match dengan iOS app (colors, fonts, layout)
4. ✅ Responsive di semua device (mobile, tablet, desktop)
5. ✅ Loading time < 2 detik
6. ✅ No authentication required untuk view bill
7. ✅ Data secure (read-only, no edit/delete dari web)

---

## 📝 Additional Notes

### Environment Variables
Jangan commit `.env.local` ke Git. Add to `.gitignore`:

```gitignore
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### Custom Domain (Optional)
Kalau mau custom domain (e.g., `tripledger.app`):
1. Beli domain di Namecheap/GoDaddy
2. Di Vercel Dashboard → Project Settings → Domains
3. Add custom domain
4. Update DNS records (Vercel kasih instruksi)
5. Wait 24-48 hours untuk DNS propagation

### Analytics (Optional)
Tambah Vercel Analytics:
1. Di Vercel Dashboard → Project Settings → Analytics
2. Enable Analytics
3. Add `<Analytics />` component di `app/layout.tsx`

---

## 🆘 Troubleshooting

### Issue: Bill not found
- **Cause:** billId salah atau bill tidak exist di Firestore
- **Solution:** Check billId di URL, verify bill exist di Firebase Console

### Issue: Firebase permission denied
- **Cause:** Firestore rules belum di-update
- **Solution:** Copy-paste rules dari PRD ini ke Firebase Console

### Issue: Environment variables not working
- **Cause:** `.env.local` tidak ter-load atau nama variable salah
- **Solution:** Pastikan variable pakai prefix `NEXT_PUBLIC_`, restart dev server

### Issue: Vercel deployment failed
- **Cause:** Build error atau missing dependencies
- **Solution:** Check Vercel logs, run `npm run build` locally untuk debug

---

## 🎉 Done!

Setelah semua selesai:
1. iOS app bisa share link
2. Web app menampilkan detail bill
3. Design match dengan iOS
4. Data secure & accessible

Semua code structure, styling, dan logic sudah dijelaskan detail di PRD ini. Tinggal implement sesuai spesifikasi! 🚀
