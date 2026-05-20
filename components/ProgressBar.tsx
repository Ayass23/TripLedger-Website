import { formatCurrency } from '@/lib/utils';

interface ProgressBarProps {
  paidAmount: number;
  totalAmount: number;
  currency: string;
}

export default function ProgressBar({ paidAmount, totalAmount, currency }: ProgressBarProps) {
  const percentage = Math.min((paidAmount / totalAmount) * 100, 100);
  const isComplete = percentage >= 100;

  return (
    <div className="space-y-2 px-5 py-4">
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
          className={`h-full transition-all duration-300 ${
            isComplete ? 'bg-success-green' : 'bg-brand-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
