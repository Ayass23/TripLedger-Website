'use client';

import { useState } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { Participant, SplitBillModel } from '@/lib/types';
import {
  formatCurrency,
  extractParticipantItems,
  extractTaxAndServiceCharges,
  calculateTaxShare,
} from '@/lib/utils';

interface ParticipantCardProps {
  participant: Participant;
  bill: SplitBillModel;
}

export default function ParticipantCard({ participant, bill }: ParticipantCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract items for this participant
  const items = extractParticipantItems(bill.notes, participant.displayName);

  // Extract total tax and service charges
  const { tax: totalTax, service: totalService } = extractTaxAndServiceCharges(bill.notes);

  // Calculate this participant's share of tax and service
  const { tax: taxShare, service: serviceShare } = calculateTaxShare(
    participant,
    totalTax,
    totalService,
    bill.totalAmount
  );

  const hasCharges = taxShare > 0 || serviceShare > 0;

  return (
    <div className="bg-surface-card rounded-2xl p-4 shadow-soft border border-border-soft">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-semibold text-brand-accent">
            {participant.displayName.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Name & Amount */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            {participant.displayName}
          </p>
          <p className="text-xs text-text-secondary">
            {formatCurrency(participant.amount, bill.currency)}
          </p>
        </div>

        {/* Status Badge */}
        {participant.isPaid ? (
          <div className="flex items-center gap-1 px-3 py-1 bg-success-green/10 rounded-full">
            <CheckCircle className="w-4 h-4 text-success-green" />
            <span className="text-xs text-success-green font-medium">Lunas</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-3 py-1 bg-warning-amber/10 rounded-full">
            <span className="text-xs text-warning-amber font-medium">Belum</span>
          </div>
        )}

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-surface-base rounded-lg transition-colors"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          <ChevronDown
            className={`w-5 h-5 text-text-tertiary transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-border-soft space-y-2">
          {/* Items Section */}
          {items.length > 0 && (
            <>
              <p className="text-xs font-medium text-text-secondary">Rincian Pembayaran</p>
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-text-tertiary mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-text-secondary flex-1">{item}</p>
                </div>
              ))}
            </>
          )}

          {/* Tax & Service Charges */}
          {hasCharges && (
            <>
              <div className="my-2 border-t border-border-soft" />
              <p className="text-xs font-medium text-text-tertiary">Biaya Tambahan:</p>

              {taxShare > 0 && (
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-warning-amber/60 mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-text-secondary">
                    Pajak/PPN - {formatCurrency(taxShare, bill.currency)}
                  </p>
                </div>
              )}

              {serviceShare > 0 && (
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-warning-amber/60 mt-1.5 flex-shrink-0" />
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
  );
}
