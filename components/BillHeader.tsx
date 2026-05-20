import { Scissors } from 'lucide-react';
import { SplitBillModel } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface BillHeaderProps {
  bill: SplitBillModel;
}

export default function BillHeader({ bill }: BillHeaderProps) {
  return (
    <div className="text-center space-y-3 pt-6 pb-4">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-primary/10 flex items-center justify-center">
        <Scissors className="w-7 h-7 text-brand-primary" />
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
  );
}
