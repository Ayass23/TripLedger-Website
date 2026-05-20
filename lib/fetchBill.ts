import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { SplitBillModel } from './types';

interface FetchBillResult {
  data?: SplitBillModel;
  error?: string;
}

/**
 * Fetch a split bill document from Firestore by ID
 * Returns either the bill data or an error message
 */
export async function fetchBill(billId: string): Promise<FetchBillResult> {
  try {
    const billRef = doc(db, 'splitBills', billId);
    const billSnap = await getDoc(billRef);

    if (!billSnap.exists()) {
      return { error: 'Tagihan tidak ditemukan' };
    }

    const data = billSnap.data();

    return {
      data: {
        id: billSnap.id,
        ...data,
      } as SplitBillModel
    };
  } catch (error) {
    console.error('Error fetching bill:', error);
    return { error: 'Gagal memuat tagihan. Silakan coba lagi.' };
  }
}
