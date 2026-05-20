import Image from 'next/image';

interface ReceiptImageProps {
  receiptURL?: string;
}

export default function ReceiptImage({ receiptURL }: ReceiptImageProps) {
  if (!receiptURL) return null;

  return (
    <div className="px-5 py-4 space-y-3">
      <h3 className="text-lg font-semibold text-text-primary">Foto Struk</h3>
      <div className="relative w-full h-64 rounded-2xl border border-border-soft overflow-hidden bg-surface-elevated">
        <Image
          src={receiptURL}
          alt="Receipt"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
