import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { fetchBill } from '@/lib/fetchBill';
import { formatCurrency } from '@/lib/utils';
import BillHeader from '@/components/BillHeader';
import ProgressBar from '@/components/ProgressBar';
import ParticipantList from '@/components/ParticipantList';
import ReceiptImage from '@/components/ReceiptImage';

interface BillDetailPageProps {
  params: Promise<{
    billId: string;
  }>;
}

// Generate metadata for SEO and sharing
export async function generateMetadata({ params }: BillDetailPageProps): Promise<Metadata> {
  const { billId } = await params;
  const { data: bill } = await fetchBill(billId);

  if (!bill) {
    return {
      title: 'Tagihan Tidak Ditemukan - TripLedger',
      description: 'Tagihan yang Anda cari tidak ditemukan.',
    };
  }

  return {
    title: `${bill.title} - TripLedger`,
    description: `Detail tagihan patungan: ${bill.title}. Total: ${formatCurrency(bill.totalAmount, bill.currency)}. Peserta: ${bill.participants.length} orang.`,
    openGraph: {
      title: bill.title,
      description: `Total: ${formatCurrency(bill.totalAmount, bill.currency)} • ${bill.participants.length} peserta`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: bill.title,
      description: `Total: ${formatCurrency(bill.totalAmount, bill.currency)}`,
    },
  };
}

export default async function BillDetailPage({ params }: BillDetailPageProps) {
  const { billId } = await params;
  const { data: bill, error } = await fetchBill(billId);

  // Handle error or not found
  if (error || !bill) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-error-red/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-error-red" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">
              {error || 'Tagihan Tidak Ditemukan'}
            </h1>
            <p className="text-sm text-text-secondary">
              Link yang Anda gunakan mungkin salah atau tagihan sudah dihapus.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate paid amount
  const paidAmount = bill.participants
    .filter(p => p.isPaid)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Header Section */}
      <BillHeader bill={bill} />

      {/* Progress Bar Section */}
      <ProgressBar
        paidAmount={paidAmount}
        totalAmount={bill.totalAmount}
        currency={bill.currency}
      />

      {/* Divider */}
      <div className="my-4 border-t border-border-soft" />

      {/* Participants List */}
      <ParticipantList bill={bill} />

      {/* Receipt Image (if available) */}
      {bill.receiptURL && (
        <>
          <div className="my-4 border-t border-border-soft" />
          <ReceiptImage receiptURL={bill.receiptURL} />
        </>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-text-tertiary">
          Dibuat dengan TripLedger
        </p>
      </div>
    </div>
  );
}
