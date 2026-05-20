import { Participant } from './types';

/**
 * Format currency amount to Indonesian Rupiah format
 * Example: formatCurrency(50000, "Rp") => "Rp 50.000"
 */
export function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${currency} ${formatter.format(amount)}`;
}

/**
 * Format amount without currency symbol
 * Example: formatAmount(50000) => "50.000"
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format Firebase Timestamp to Indonesian date format
 * Example: formatDate(timestamp) => "20 Mei 2024, 14:30"
 */
export function formatDate(timestamp: any): string {
  if (!timestamp) return '';

  // Convert Firestore Timestamp to Date
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Extract item name from notes line
 * Example: "• 2x Nasi Goreng (Rp 25000 @ Rp 50000): Andi, Budi" => "2x Nasi Goreng"
 */
function extractItemName(itemPart: string): string {
  const trimmed = itemPart.trim().replace('•', '').trim();
  const match = trimmed.match(/^(.+?)\s*\(/);
  return match ? match[1].trim() : trimmed;
}

/**
 * Extract total price from notes line
 * Example: "• 2x Nasi Goreng (Rp 25000 @ Rp 50000): Andi, Budi" => 50000
 */
function extractTotalPrice(itemPart: string): number {
  const match = itemPart.match(/@\s*Rp\s*([\d,]+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''), 10);
  }

  // Fallback: try to get single price
  const singleMatch = itemPart.match(/Rp\s*([\d,]+)/);
  return singleMatch ? parseInt(singleMatch[1].replace(/,/g, ''), 10) : 0;
}

/**
 * Extract number from a string
 * Example: "Pajak/PPN (Rp 13100): All" => 13100
 */
function extractNumber(line: string): number {
  const match = line.match(/Rp\s*([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
}

/**
 * Extract participant's items from notes
 * Returns array of item descriptions with prices
 */
export function extractParticipantItems(
  notes: string | undefined,
  participantName: string
): string[] {
  if (!notes) return [];

  const lines = notes.split('\n');
  const items: string[] = [];

  for (const line of lines) {
    // Skip tax and service lines
    if (line.includes('Pajak') || line.includes('PPN') || line.includes('Service')) {
      continue;
    }

    // Pattern: "• 2x Nasi Goreng (Rp 25000 @ Rp 50000): Andi, Budi"
    if (line.includes('•') && line.includes(':')) {
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

/**
 * Extract tax and service charges from notes
 * Returns total tax and service amounts
 */
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

/**
 * Calculate proportional tax and service share for a participant
 * Based on their item amount relative to total items amount
 */
export function calculateTaxShare(
  participant: Participant,
  totalTax: number,
  totalService: number,
  billTotalAmount: number
): { tax: number; service: number } {
  const totalCharges = totalTax + totalService;
  const totalItemsAmount = billTotalAmount - totalCharges;

  if (totalItemsAmount <= 0) {
    return { tax: 0, service: 0 };
  }

  // Participant's item amount (excluding their share of tax/service)
  const participantItemAmount = participant.amount - (totalCharges * (participant.amount / billTotalAmount));

  // Calculate proportion
  const proportion = participantItemAmount / totalItemsAmount;

  return {
    tax: totalTax * proportion,
    service: totalService * proportion
  };
}
