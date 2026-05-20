import { Scissors } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-primary/10 flex items-center justify-center">
          <Scissors className="w-10 h-10 text-brand-primary" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-title-1 font-bold text-text-primary">
            TripLedger
          </h1>
          <p className="text-base text-text-secondary">
            Kelola split bill dengan mudah
          </p>
        </div>

        {/* Info */}
        <div className="bg-surface-card rounded-2xl p-6 border border-border-soft shadow-soft">
          <p className="text-sm text-text-secondary leading-relaxed">
            Untuk melihat detail tagihan patungan, Anda memerlukan link yang dibagikan dari TripLedger iOS app.
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-text-tertiary">
          © 2024 TripLedger. All rights reserved.
        </p>
      </div>
    </div>
  );
}
