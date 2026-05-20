import { SplitBillModel } from '@/lib/types';
import ParticipantCard from './ParticipantCard';

interface ParticipantListProps {
  bill: SplitBillModel;
}

export default function ParticipantList({ bill }: ParticipantListProps) {
  return (
    <div className="space-y-4 px-5 py-4">
      {/* Header */}
      <h2 className="text-lg font-semibold text-text-primary">Daftar Patungan</h2>

      {/* List */}
      <div className="space-y-3">
        {bill.participants.map((participant) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            bill={bill}
          />
        ))}
      </div>
    </div>
  );
}
