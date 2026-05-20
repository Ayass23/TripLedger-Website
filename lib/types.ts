import { Timestamp } from 'firebase/firestore';

export interface Participant {
  id: string;
  uid?: string;
  displayName: string;
  amount: number;
  isPaid: boolean;
}

export interface SplitBillModel {
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
